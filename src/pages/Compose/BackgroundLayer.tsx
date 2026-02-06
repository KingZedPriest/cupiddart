// Stores
import { useEditorStore } from "@/stores/editor.store";

export default function BackgroundLayer() {
    
    const { background } = useEditorStore((s) => s.layout);

    switch (background.type) {
        case "color":
            return (
                <div className="absolute inset-0" style={{ background: background.value }} />
            );

        case "image":
            return (
                <img src={background.assetUrl} className="fixed inset-0 w-full h-dvh object-cover" />
            );

        case "video":
            return (
                <video src={background.assetUrl} autoPlay muted
                    loop={background.loop} playsInline className="fixed inset-0 w-full h-dvh object-cover" />
            );
    }

}
