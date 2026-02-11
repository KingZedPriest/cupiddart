import { useRouter } from "@tanstack/react-router";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { CloseCircle } from "iconsax-reactjs";
import SchedulePicker from "./DateTime";

const REVEAL_OPTIONS = [
    { heading: "Reveal Immediately", subheading: "They’ll see your name right away", option: "now" },
    { heading: "Reveal later if they ask", subheading: "Stay anonymous until they request to know", option: "later" },
    { heading: "Stay anonymous forever", subheading: "Keep the mystery alive", option: "never" }
]

const SEND_OPTIONS = [
    { heading: "Send Immediately", subheading: "Send instantly to the receiver", option: "now" },
    { heading: "Schedule Delivery", subheading: "Schedule a specific date and time", option: "later" }
]

const Form = () => {

    const router = useRouter();
    const { layout, updatePreference } = useEditorStore();
    const preferences = layout.preferences;

    return (
        <main className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-4xl max-w-136.5 max-h-174">
            <button onClick={() => router.history.back()} className="group -top-10 right-0 absolute flex items-center gap-x-1 bg-[#F0F0F0]/90 hover:bg-destructive px-2 py-1 rounded-4xl hover:text-white duration-200 cursor-pointer">
                <CloseCircle variant="Bold" className="size-4 text-[#DB2863] group-hover:text-white" />
                <p className="text-[8px] md:text-[9px] xl:text-[10px]">Cancel</p>
            </button>

            <section className="flex justify-between">
                <div>
                    <h1 className="font-bold text-black text-lg md:text-xl xl:text-2xl">Preferences</h1>
                    <p className="mt-2 font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">Complete the preferences on how and when it is delivered</p>
                </div>

                <div className="flex gap-x-1 bg-[#F5F5F5] p-1 border border-black/4 rounded-3xl h-fit">
                    <div className="bg-destructive rounded-3xl w-6 h-1.25" />
                    <div className="bg-[#CDCDCD] rounded-3xl w-1.5 h-1.25" />
                </div>
            </section>

            <section className="mt-12">
                <p className="font-bold text-[11px] text-black md:text-xs">When should they know who you are?</p>
                {REVEAL_OPTIONS.map((option, index) => (
                    <div key={`reveal-${option.option}-${index}`} onClick={() => updatePreference({ reveal: option.option as "now" | "later" | "never" })} className={`flex items-center gap-x-2 mt-2 px-2 py-3 border ${preferences.reveal === option.option ? "border-destructive" : "border-black/8"}  rounded-xl cursor-pointer`}>
                        <div className={`${preferences.reveal === option.option ? "bg-[#B00053]" : "bg-[#E5E7E3]"} place-content-center grid  rounded-[50%] size-6`}>
                            <div className={`${preferences.reveal === option.option ? "bg-[#DB2863]" : "bg-inherit"} size-3 rounded-[50%]`} />
                        </div>
                        <div className="font-medium">
                            <p className="text-[11px] text-black md:text-xs">{option.heading}</p>
                            <p className="text-[9px] text-muted-foreground md:text-[10px]">{option.subheading}</p>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mt-8">
                <p className="font-bold text-[11px] text-black md:text-xs">When should we send it?</p>
                {SEND_OPTIONS.map((option, index) => (
                    <div key={`send-${option.option}-${index}`} onClick={() => updatePreference({ send: option.option as "now" | "later" })} className={`flex items-center gap-x-2 mt-2 px-2 py-3 border ${preferences.send === option.option ? "border-destructive" : "border-black/8"}  rounded-xl cursor-pointer`}>
                        <div className={`${preferences.send === option.option ? "bg-[#B00053]" : "bg-[#E5E7E3]"} place-content-center grid  rounded-[50%] size-6`}>
                            <div className={`${preferences.send === option.option ? "bg-[#DB2863]" : "bg-inherit"} size-3 rounded-[50%]`} />
                        </div>
                        <div className="font-medium">
                            <p className="text-[11px] text-black md:text-xs">{option.heading}</p>
                            <p className="text-[9px] text-muted-foreground md:text-[10px]">{option.subheading}</p>
                        </div>
                    </div>
                ))}
                {preferences.send === "later" &&
                    <SchedulePicker />
                }
            </section>
        </main>
    );
}

export default Form;