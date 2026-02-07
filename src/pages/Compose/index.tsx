// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import Header from "./Header";
import BackgroundLayer from "./BackgroundLayer";
import EditorCanvas from "./EditorCanvas";
import Select from "./Select";
import Preview from "./Preview";

const Index = () => {
    
    const preview = useEditorStore((s) => s.layout.preview);

    return preview ? (
        <Preview />
    ) : (
        <main className="p-2">
            <BackgroundLayer />
            <Header />
            <EditorCanvas />
            <Select />
        </main>
    );
};

export default Index;
