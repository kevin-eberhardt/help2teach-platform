import { Link } from "@/lib/i18n/routing";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="border-slate-200 border-t w-full p-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="text-muted-foreground">
          <p>&copy; {date.getFullYear()} - Help2Teach</p>
        </div>
        <div className="flex gap-4 text-muted-foreground">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/imprint">Impressum</Link>
        </div>
      </div>
    </footer>
  );
}
