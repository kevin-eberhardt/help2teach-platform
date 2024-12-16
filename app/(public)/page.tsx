import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Startseite | Help2Teach",
  };
}
export default function Home() {
  return <h1 className="text-9xl">Public page</h1>;
}
