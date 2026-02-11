import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/preferences";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import Form from "./Form";

const Index = () => {

    const navigate = useNavigate();
    const search = Route.useSearch();

    //Functions

    return (
        <main className="fixed inset-0 bg-[#ABABAB] p-2">
            <section className="flex justify-center items-center h-full">
                {search.page === 1 && <Form />}
            </section>
        </main>
    );
}

export default Index;