import Image from "next/image";
import { RegistrationForm } from "./RegistrationForm";

export default function Home() {
  return (
    <div className="mx-auto max-w-xl my-8">
      <RegistrationForm />
    </div>
  );
}
