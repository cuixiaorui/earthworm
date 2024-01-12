import React, { ForwardedRef, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface InputProps {
    name: string
    label: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors: Record<PropertyKey, { message?: string }>
    type?: HTMLInputElement["type"]
    required?: boolean
}


const Component = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const isError = props.errors && props.errors[props.name]
    return (
        <div className="relative">
            <div className="flex items-center">
                <label htmlFor={props.name} className={cn("block text-sm font-medium leading-6 text-gray-900", {
                    "text-red-500": isError
                })}>
                    {props.label}
                </label>
                {props.required && <div className="text-sm text-red-500">*</div>}
            </div>
            <div className="mt-2">
                <input
                    ref={ref}
                    id={props.name}
                    name={props.name}
                    type={props.type || "text"}
                    onChange={props.onChange}
                    className={cn("px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", {
                        "ring-red-500": isError,
                    })}
                />
            </div>
            {isError && (
                <span className="absolute left-0 top-full mt-1 text-xs text-red-500">{props.errors[props.name]?.message}</span>
            )}
        </div>
    )
}

export const Input = forwardRef(Component)