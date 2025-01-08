"use client";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/assets/media/welcome-animation.json";
export default function WelcomeAnimation() {
  return <DynamicLottie animationData={animationData} />;
}
