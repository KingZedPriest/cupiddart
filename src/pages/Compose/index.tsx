// UIs
import Header from "./Header";
import BackgroundLayer from "./BackgroundLayer";
import EditorCanvas from "./EditorCanvas"
import Select from "./Select";

const index = () => {
    return (
        <main className="p-2">
            <BackgroundLayer />
            <Header />
            <EditorCanvas />
            <Select />
        </main>
    );
}

export default index;