
import Game from "@/components/Game";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-screen relative">
      <Image
        src="/images/bg.png"
        alt="background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <Game/>
    </div>
  );
}
