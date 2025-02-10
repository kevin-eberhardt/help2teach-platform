import { Undo } from "lucide-react";

export default function VideoSection() {
  return (
    <section id="tutorial-video">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Im Handumdrehen einsatzbereit</h2>
        <div className="flex justify-center items-center gap-2 max-w-lg ">
          <Undo className="-rotate-45" />
          <p className="text-base">
            See how to go from zero to seating plan in 2 minutes
          </p>
        </div>
        <video autoPlay loop muted className="w-2/3">
          <source
            src="https://cdn.pixabay.com/video/2021/09/11/88207-602915574_large.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}
