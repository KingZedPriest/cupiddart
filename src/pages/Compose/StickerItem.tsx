import { Rnd } from "react-rnd";
import type { RefObject } from "react";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { RotateRight, Trash, Maximize4 } from "iconsax-reactjs";

type Props = {
    sticker: Sticker;
    parentRef: RefObject<HTMLDivElement | null>;
};

export default function StickerItem({ sticker, parentRef }: Props) {

    const { updateSticker, removeSticker } = useEditorStore();

    if (!parentRef.current) return null;

    const pw = parentRef.current.offsetWidth;
    const ph = parentRef.current.offsetHeight;

    return (
        <Rnd bounds="parent"
            size={{
                width: (sticker.width / 100) * pw,
                height: (sticker.height / 100) * ph,
            }}
            position={{
                x: (sticker.x / 100) * pw,
                y: (sticker.y / 100) * ph,
            }}
            onDragStop={(_, d) => {
                updateSticker(sticker.id, {
                    x: (d.x / pw) * 100,
                    y: (d.y / ph) * 100,
                });
            }}
            onResizeStop={(_, __, ref, ___, pos) => {
                updateSticker(sticker.id, {
                    width: (ref.offsetWidth / pw) * 100,
                    height: (ref.offsetHeight / ph) * 100,
                    x: (pos.x / pw) * 100,
                    y: (pos.y / ph) * 100,
                });
            }}
            enableResizing={{
                topRight: true,
            }}
            lockAspectRatio
            style={{ zIndex: sticker.zIndex }}
            className="border border-primary rounded-md">

            <div className="relative w-full h-full">

                <button onClick={() => updateSticker(sticker.id, { rotation: (sticker.rotation + 30) % 360 })} className="-top-3 -left-3 absolute flex justify-center items-center bg-black p-1 rounded-full text-white cursor-grab">
                    <RotateRight className="size-4" />
                </button>

                <button className="-top-3 -right-3 absolute flex justify-center items-center bg-black p-1 rounded-full text-white">
                    <Maximize4 className="size-4" />
                </button>

                <button onClick={() => removeSticker(sticker.id)} className="-right-3 -bottom-3 absolute flex justify-center items-center bg-black hover:bg-destructive p-1 rounded-full text-white duration-200 cursor-pointer">
                    <Trash className="size-4" />
                </button>

                {/* Sticker image */}
                <img src={sticker.assetUrl} className="w-full h-full object-contain pointer-events-none select-none" draggable={false} style={{ transform: `rotate(${sticker.rotation}deg)` }} />
            </div>
        </Rnd>
    );
}
