// Stores
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { Eye, ArrowDown2, LoginCurve } from "iconsax-reactjs";

const Header = () => {

    const { title } = useEditorStore((s) => s.layout);
    const show = false;

    return (
        <main className="flex sm:flex-row flex-col justify-between items-center gap-y-2">
            <section className="flex items-center gap-x-2 bg-white drop-shadow-lg p-2 rounded-4xl">
                <img src="/favicon.png" alt="favicon" className="size-6" />
                {show && <ArrowDown2 className="size-4" />}
                <p className="pr-2 font-medium text-[#4F4F4F] text-[11px] md:text-xs xl:text-sm">
                    {title.trim() ? title : "Untitled"}
                </p>
            </section>
            <section className="flex justify-between gap-x-5 bg-white drop-shadow-lg rounded-4xl font-semibold text-[11px] md:text-xs xl:text-sm text-accent-foreground">
                <div className="p-1">
                    <button className="flex items-center gap-x-2 bg-white px-3 py-2 border border-[#E8E8E8] rounded-full cursor-pointer">
                        Preview
                        <Eye className="size-4" />
                    </button>
                </div>
                <div className="bg-[#E5E7E3] w-0.5"></div>
                <div className="p-1">
                    <button className="flex items-center gap-x-2 bg-destructive hover:bg-white px-3 py-2 border border-destructive rounded-full text-white hover:text-destructive duration-200 cursor-pointer">
                        Sign In
                        <LoginCurve className="size-4" />
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Header;