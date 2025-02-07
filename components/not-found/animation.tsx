"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/not-found.json";

export default function NotFoundAnimation() {
  return <DynamicLottie animationData={animationData} />;
}
