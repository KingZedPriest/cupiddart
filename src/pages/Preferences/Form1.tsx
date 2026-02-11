import { useRouter } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/preferences";
import { toast } from "react-fox-toast";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { ArrowLeft, CloseCircle, InfoCircle, Send2, Trash } from "iconsax-reactjs";

const Form1 = () => {

    const router = useRouter();
    const { layout, updatePreference } = useEditorStore();

    const clear = () => {
        const payload = { recipientEmail: "", name: "", hint: "", email: "" }
        updatePreference(payload);
        toast.info("Form Cleared")
    }

    const navigate = useNavigate({ from: Route.fullPath });
    const goBack = (page: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                page
            })
        })
    }

    return (
        <main className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-4xl max-w-136.5 max-h-174">
            <button onClick={() => router.history.back()} className="group -top-10 right-0 absolute flex items-center gap-x-1 bg-[#F0F0F0]/90 hover:bg-destructive px-2 py-1 rounded-4xl hover:text-white duration-200 cursor-pointer">
                <CloseCircle variant="Bold" className="size-4 text-[#DB2863] group-hover:text-white" />
                <p className="text-[8px] md:text-[9px] xl:text-[10px]">Cancel</p>
            </button>

            <section className="flex justify-between">
                <div>
                    <h1 className="font-bold text-black text-lg md:text-xl xl:text-2xl">A little more information</h1>
                    <p className="mt-2 font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">Fill in the details below. Don't worry your identity stays secret.</p>
                </div>

                <div className="flex gap-x-1 bg-[#F5F5F5] p-1 border border-black/4 rounded-3xl h-fit">
                    <div className="bg-[#CDCDCD] rounded-3xl w-1.5 h-1.25" />
                    <div className="bg-destructive rounded-3xl w-6 h-1.25" />
                </div>
            </section>

            <section className="space-y-5 mt-12">
                <div className="space-y-1">
                    <label htmlFor="email" className="block font-bold text-[11px] text-black md:text-xs cursor-pointer">Who's the lucky person?</label>
                    <input value={layout.preferences.recipientEmail} onChange={(e) => updatePreference({ recipientEmail: e.target.value })} type="email" name="email" id="email" className="px-1.5 py-2.5 border border-black/8 focus:border-destructive rounded-2xl outline-0 w-full placeholder:font-medium placeholder:text-[#B0B5B5] placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm" placeholder="Their@gmail.com" />
                </div>

                <div className="space-y-1">
                    <label htmlFor="name" className="block font-bold text-[11px] text-black md:text-xs cursor-pointer">Your Name</label>
                    <input value={layout.preferences.name} onChange={(e) => updatePreference({ name: e.target.value })} type="text" name="name" id="name" className="px-1.5 py-2.5 border border-black/8 focus:border-destructive rounded-2xl outline-0 w-full placeholder:font-medium placeholder:text-[#B0B5B5] placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm" placeholder="What they know you as" />
                </div>

                <div className="space-y-1">
                    <label htmlFor="hint" className="block font-bold text-[11px] text-black md:text-xs cursor-pointer">A Hint About You  <span className="text-foreground/30">(Optional)</span></label>
                    <input value={layout.preferences.hint} onChange={(e) => updatePreference({ hint: e.target.value })} type="text" name="hint" id="hint" className="px-1.5 py-2.5 border border-black/8 focus:border-destructive rounded-2xl outline-0 w-full placeholder:font-medium placeholder:text-[#B0B5B5] placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm" placeholder="We met at the coffee shop..." />
                    <div className="flex items-center gap-x-0.5 text-foreground/40">
                        <InfoCircle className="size-4" variant="Bold" />
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px]">Give them a clue to guess who you are</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="yourEmail" className="block font-bold text-[11px] text-black md:text-xs cursor-pointer">Your Email</label>
                    <input value={layout.preferences.email} onChange={(e) => updatePreference({ email: e.target.value })} type="email" name="yourEmail" id="yourEmail" className="px-1.5 py-2.5 border border-black/8 focus:border-destructive rounded-2xl outline-0 w-full placeholder:font-medium placeholder:text-[#B0B5B5] placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm" placeholder="your@email.com" />
                    <div className="flex items-center gap-x-0.5 text-foreground/40">
                        <InfoCircle className="size-4" variant="Bold" />
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px]">We'll notify you if they reply. Never shared without your consent.</p>
                    </div>
                </div>
            </section>
            <section className="flex justify-between items-center mt-14 mb-8 font-semibold text-[11px] md:text-xs xl:text-sm">
                <button onClick={() => goBack(1)} className="flex items-center gap-x-2 px-4 py-2.5 border border-[#E8E8E8] hover:border-destructive rounded-4xl hover:text-destructive duration-200 cursor-pointer">
                    <ArrowLeft className="size-4" />
                    Back
                </button>

                <div className="flex gap-x-2 ml-auto">
                    <button onClick={clear} className="flex items-center gap-x-2 px-4 py-2.5 border border-[#E8E8E8] hover:border-destructive rounded-4xl hover:text-destructive duration-200 cursor-pointer">
                        Clear All
                        <Trash className="size-4" />
                    </button>
                    <button className="flex items-center gap-x-2 bg-destructive hover:bg-inherit px-4 py-2.5 hover:border hover:border-destructive rounded-4xl text-white hover:text-destructive duration-200 cursor-pointer">
                        Send
                        <Send2 className="size-4" />
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Form1;