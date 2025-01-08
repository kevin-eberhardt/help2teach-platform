import Link from "next/link";
import WelcomeAnimation from "./animation";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="w-full md:max-w-lg mx-auto mt-6 space-y-4">
      <WelcomeAnimation />
      <div className="space-y-4">
        <h1 className="text-4xl">Willkommen!</h1>
        <p>
          Dein Account wurde erfolgreich aktiviert. Du kannst dich nun
          einloggen!
        </p>
      </div>
      <div>
        <Link href="/login">
          <Button>Zum Login</Button>
        </Link>
      </div>
    </div>
  );
}
