"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schema } from "./registrationSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRef } from "react";


export const RegistrationForm = ({ onDataAction, onFormDataAction }: {
    onDataAction: (data: z.infer<typeof schema>) => Promise<{
        message: string;
        user?: z.infer<typeof schema>;
        issues?: string[];
    }>;
    onFormDataAction: (
        initalState: {
            message: string;
            user?: z.infer<typeof schema>;
            issues?: string[];
        }
        , data: FormData) => Promise<{
            message: string;
            user?: z.infer<typeof schema>;
            issues?: string[];
        }>;
}) => {
    // Above the return inside of RegistrationForm
    const formRef = useRef<HTMLFormElement>(null);

    // inside of RegistrationForm
    const [state, formAction] = useFormState(onFormDataAction, {
        message: ""
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            first: "",
            last: "",
            email: "",
            zipcode: ""
        }
    });

    // inside of RegistrationForm.tsx
    const onSubmit = async (data: z.infer<typeof schema>) => {
        // console.log(await onDataAction(data));
        const formData = new FormData(); // Create a new FormData object
        formData.append("first", data.first);
        formData.append("last", data.last);
        formData.append("email", data.email);
        // fetch("/api/registerForm", {
        //     method: "POST",
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        // console.log(await onFormDataAction(formData));
    };

    return <Form {...form}>
        <div>{state?.message}</div>
        <form
            ref={formRef}
            action={formAction}
            onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
            className="space-y-8"
        >
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="first"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>Your first name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>Your last name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>Your zipcode (NNNNN).</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>Your email address.</FormDescription>
                        <FormMessage /> *
                    </FormItem>
                )}
            />

            <Button type="submit">Submit</Button>
        </form>
    </Form>;
};