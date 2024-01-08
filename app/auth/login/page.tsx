"use client";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../store/user";

const loginSchema = z.object({
  phone: z
    .string()
    .refine((val) => val.length === 11, { message: "手机号必须是11位" }),
  password: z
    .string()
    .min(6, "密码长度必须在6-20位之间")
    .max(20, "密码长度必须在6-20位之间"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default () => {
  const { login } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin = async (data: LoginSchema) => {
    const error = await login(data);
    if (error !== null) {
      toast({
        title: error,
      });
      return;
    }
    router.replace("/");
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="earthworm"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <Input
              {...register("phone")}
              label="Phone"
              required
              errors={errors}
            />
            <Input
              {...register("password")}
              type="password"
              required
              label="Password"
              errors={errors}
            />

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
