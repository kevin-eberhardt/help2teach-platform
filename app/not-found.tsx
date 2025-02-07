import Footer from "@/components/footer";
import Header from "@/components/header";
import NotFoundAnimation from "@/components/not-found/animation";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { getUser } from "@/lib/supabase/queries";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const messages = await getMessages();
  const t = await getTranslations("not-found-page");
  const user = await getUser();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <div className="flex gap-12 items-center p-4 mx-auto max-w-7xl">
        <NotFoundAnimation />
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
          <p>{t("description")}</p>
          <div className="flex gap-2">
            {user && (
              <Link href="/app">
                <Button>{t("to-app")}</Button>
              </Link>
            )}
            <Link href="/">
              <Button>{t("to-homepage")}</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
