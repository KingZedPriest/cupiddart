import { useRef } from "react";

// UIs
import BackgroundLayer from "@/pages/Compose/BackgroundLayer";
import Paper from "@/pages/Compose/Paper";
import StickerItem from "@/pages/Compose/StickerItem";


export default function LetterRenderer({ layout }: { layout: LetterLayout }) {

    const ref = useRef<HTMLDivElement>(null);

    return (
        <main className="p-2">
            <BackgroundLayer />
            <section ref={ref} className="bg-white mx-auto mt-15 border border-[#E5E7E3] w-full max-w-114.75 h-162.5">
                <Paper />
                {layout.stickers.map((s) => (
                    <StickerItem key={s.id} sticker={s} parentRef={ref} />
                ))}
            </section>
        </main>
    );
}
