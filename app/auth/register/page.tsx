'use client';
import Link from "next/link"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "../../../components/ui/input";
import { useSession } from "../../../hooks/user";
import { useToast } from "../../../components/ui/use-toast";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
    phone: z.string().refine((val) => val.length === 11, { message: "手机号必须是11位" }),
    password: z.string().min(6, "密码长度必须在6-20位之间").max(20, '密码长度必须在6-20位之间'),
    confirmPassword: z.string().min(6, "密码长度必须在6-20位之间").max(20, '密码长度必须在6-20位之间'),
    name: z.string().min(2, "昵称早小2位").max(20, '昵称长度不能大于20位'),
}).refine(data => data.password === data.confirmPassword, { path: ['confirmPassword'], message: "两次密码不一致" })

type Schema = z.infer<typeof registerSchema>

export default () => {
    const { register: reigsterUser } = useSession()
    const { toast } = useToast()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(registerSchema),
    })
    const handleLogin = async (data: Schema) => {
        const error = await reigsterUser(data)
        if (error !== null) {
            toast({
                title: error,
            })
            return
        }
        router.replace('/')
    }
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
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                        <Input {...register("name", { required: true })} required label="NickName" errors={errors} />
                        <Input {...register("phone", { required: true })} required label="Phone" errors={errors} />
                        <Input {...register("password", { required: true })} required type="password" label="Password" errors={errors} />
                        <Input {...register("confirmPassword", { required: true })} required type="password" label="Confirm Password" errors={errors} />

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Has a account?{' '}
                        <Link href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}