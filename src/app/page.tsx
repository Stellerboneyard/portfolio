import { ScrollRig } from "@/components/scene/ScrollRig";
import { Loader } from "@/components/Loader";
import { HUD } from "@/components/HUD";
import { Sections } from "@/components/Sections";
import { FrameScrollLayer } from "@/components/FrameScrollLayer";
import { ChapterNav } from "@/components/ChapterNav";

export default function Home() {
  return (
    <>
      <ScrollRig />
      <FrameScrollLayer />
      <div className="grain" />
      <HUD />
      <ChapterNav />
      <Sections />
      <Loader />
    </>
  );
}
