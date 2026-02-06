// Stores
import { useEditorStore } from "@/stores/editor.store";

const Paper = () => {

    const { paper } = useEditorStore((s) => s.layout);

    return (
        <img src={paper} className="absolute inset-0 w-full h-full object-cover" />
    );
}

export default Paper;