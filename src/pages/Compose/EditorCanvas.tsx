import { useRef } from "react";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import Paper from "./Paper";
import StickerItem from "./StickerItem";

export default function EditorCanvas() {

    const ref = useRef<HTMLDivElement>(null);
    const { layout } = useEditorStore();

    return (
        <div>
            <div ref={ref} className="relative bg-white mx-auto mt-15 border border-[#E5E7E3] w-full max-w-114.75 h-162.5">
                <Paper />
                {layout.stickers.map((s) => (
                    <StickerItem key={s.id} sticker={s} parentRef={ref} />
                ))}
            </div>
            <p className="relative my-4 font-medium text-[#4F4F4F] text-[10px] md:text-[11px] xl:text-xs text-center">Wordcount: {layout.body.length}/200</p>
        </div>
    );
}
