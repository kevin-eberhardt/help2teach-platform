import Footer from "@/components/layout/website/footer";
import Header from "@/components/layout/website/header";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
