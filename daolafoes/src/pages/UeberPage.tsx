import { UeberUns } from "@/components/home/UeberUns";
import { Statement } from "@/components/home/Statement";
import { Klassiker } from "@/components/home/Klassiker";

export default function UeberPage() {
  return (
    <>
      <div style={{ paddingTop: "calc(var(--label-h) + 70px)" }} className="bg-fundo" />
      <UeberUns full />
      <Statement />
      <Klassiker />
    </>
  );
}
