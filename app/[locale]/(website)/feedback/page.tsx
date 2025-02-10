import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
};

export default function FeedbackPage() {
  return (
    <main className="flex flex-col flex-grow">
      <div className="p-4">
        <h1>Feedback</h1>
      </div>
    </main>
  );
}
