import { Route } from "@/routes/preferences";

// UIs
import Form from "./Form";
import Form1 from "./Form1";

const Index = () => {

    const search = Route.useSearch();

    //Functions

    return (
        <main className="fixed inset-0 bg-[#ABABAB] p-2">
            <section className="flex justify-center items-center h-full">
                {search.page === 1 && <Form />}
                {search.page === 2 && <Form1 />}
            </section>
        </main>
    );
}

export default Index;