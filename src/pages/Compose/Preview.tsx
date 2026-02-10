import { useRef } from "react";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import BackgroundLayer from "@/pages/Compose/BackgroundLayer";
import Paper from "@/pages/Compose/Paper";

// Icons
import { CloseCircle } from "iconsax-reactjs";

export default function Preview() {

    const ref = useRef<HTMLDivElement>(null);
    const { layout, editPreview } = useEditorStore();

    const { font } = layout;

    return (
        <main className="relative p-2">
            <BackgroundLayer />

            <CloseCircle onClick={() => editPreview(false)} variant="Bold" className="top-4 right-4 z-50 fixed bg-white size-7 text-destructive cursor-pointer" />

            <section ref={ref} className="relative bg-white mx-auto mt-20 border border-[#E5E7E3] w-full max-w-114.75 h-162.5 overflow-hidden">
                <Paper />

                {layout.stickers.map((s) => (
                    <img key={s.id} src={s.assetUrl} draggable={false} className="absolute object-contain pointer-events-none select-none"
                        style={{
                            left: `${s.x}%`, top: `${s.y}%`, width: `${s.width}%`, height: `${s.height}%`, transform: `rotate(${s.rotation}deg)`, zIndex: s.zIndex,
                        }} />
                ))}

                <section className="relative p-4 md:p-5 xl:p-6">
                    {layout.title && (
                        <h1 className="px-4 py-2 font-semibold text-base md:text-lg xl:text-xl"
                            style={{ fontFamily: font.fontFamily, textAlign: font.horizontalAlign }}>
                            {layout.title}
                        </h1>
                    )}

                    {layout.body && (
                        <div className="px-4 py-2 h-140 overflow-y-auto text-sm md:text-base xl:text-lg hide-scrollbar" style={{
                            fontFamily: font.fontFamily, fontSize: font.size, textAlign: font.horizontalAlign,
                            whiteSpace: "pre-wrap", display: "flex", alignItems: font.verticalAlign,
                        }}>
                            {layout.body}
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}
