import Image from "next/image";
import { RegistrationForm } from "./RegistrationForm";
import { z } from "zod";
import { schema } from "./registrationSchema";

export default function Home() {
  const onDataAction = async (data: z.infer<typeof schema>) => {
    "use server";

    const parsed = schema.safeParse(data);

    if (parsed.success) {
      console.log("User registered");
      return { message: "User registered", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };
  const onFormDataAction = async (initalState: {
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }, formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      console.log("User registered");
      return { message: "User registered", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <div className="mx-auto max-w-xl my-8">
      <RegistrationForm onDataAction={onDataAction} onFormDataAction={onFormDataAction} />
    </div>
  );
}
