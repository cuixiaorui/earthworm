import { cookies } from "next/headers";
import { SessionOptions, getIronSession } from "iron-session";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import argon2 from "argon2";
import { redirect } from "next/navigation";
import {
  sessionOptions,
  defaultSession,
  type SessionData,
} from "@/actions/user";

export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const action = new URL(request.url).searchParams.get("action");
  if (action === "logout") {
    session.destroy();
    return redirect("/auth/login");
  }
  if (!session.isLogin) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const formData = await request.json();
  const type = formData.type as "register" | "login";
  const user = await prisma.user.findUnique({
    where: {
      phone: formData.get("phone"),
    },
  });
  if (type === "login") {
    if (!user) {
      return Response.json({
        error: "User not found",
      });
    }

    if (await argon2.verify(user.password, formData.get("password"))) {
      session.username = user.name;
      session.userId = user.id;
      session.isLogin = true;
      await session.save();
      return Response.json({
        error: null,
      });
    }
    return Response.json({
      error: "Wrong password",
    });
  } else {
    if (user) {
      return Response.json({
        error: "User already exists",
      });
    }
    const hashedPassword = await argon2.hash(formData.get("password"));
    await prisma.user.create({
      data: {
        name: formData.get("name"),
        phone: formData.get("phone"),
        password: hashedPassword,
      },
    });
    return Response.json({
      error: null,
    });
  }
}
