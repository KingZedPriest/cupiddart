import { useRouter, useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/preferences";
import { toast } from "react-fox-toast";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import CloseBtn from "@/components/CloseBtn";

// Icons
import { ArrowLeft, InfoCircle, Send2, Trash } from "iconsax-reactjs";

const inputClass = "px-1.5 py-2.5 border border-black/8 focus:border-destructive rounded-2xl outline-0 w-full placeholder:font-medium placeholder:text-[#B0B5B5] placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm";

const buttonBaseClass = "flex items-center gap-x-2 px-4 py-2.5 border border-[#E8E8E8] rounded-4xl duration-200 cursor-pointer";

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    type?: string;
    placeholder: string;
    optional?: boolean;
    infoText?: string;
    onChange: (value: string) => void;
}

const InputField = ({ id, label, value, type = "text", placeholder, optional, infoText, onChange }: InputFieldProps) => (

    <div className="space-y-1">
        <label htmlFor={id} className="block font-bold text-[11px] text-black md:text-xs cursor-pointer">
            {label}
            {optional && (
                <span className="text-foreground/30"> (Optional)</span>
            )}
        </label>

        <input id={id} name={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />

        {infoText && (
            <div className="flex items-center gap-x-0.5 text-foreground/40">
                <InfoCircle className="size-4" variant="Bold" />
                <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px]">
                    {infoText}
                </p>
            </div>
        )}
    </div>
);

const Form1 = () => {

    const router = useRouter();
    const navigate = useNavigate({ from: Route.fullPath });
    const { layout, updatePreference } = useEditorStore();

    const preferences = layout.preferences;

    const clear = () => {
        updatePreference({
            recipientEmail: "",
            name: "",
            hint: "",
            email: "",
        });
        toast.info("Form Cleared");
    };

    const goBack = (page: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                page,
            }),
        });
    };

    return (
        <main className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-4xl w-full max-w-136.5 max-h-174">

            <CloseBtn onClose={() => router.history.back()} title="Cancel" />

            <section className="flex justify-between">
                <div>
                    <h1 className="font-bold text-black text-lg md:text-xl xl:text-2xl">
                        A little more information
                    </h1>
                    <p className="mt-2 font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Fill in the details below. Don't worry your identity stays secret.
                    </p>
                </div>

                <div className="flex gap-x-1 bg-[#F5F5F5] p-1 border border-black/4 rounded-3xl h-fit">
                    <div className="bg-[#CDCDCD] rounded-3xl w-1.5 h-1.25" />
                    <div className="bg-destructive rounded-3xl w-6 h-1.25" />
                </div>
            </section>

            <section className="space-y-5 mt-12">
                <InputField id="recipientEmail" label="Who's the lucky person?" type="email" value={preferences.recipientEmail}
                    placeholder="Their@gmail.com" onChange={(value) => updatePreference({ recipientEmail: value })} />

                <InputField id="name" label="Your Name" value={preferences.name} placeholder="What they know you as"
                    onChange={(value) => updatePreference({ name: value })} />

                <InputField id="hint" label="A Hint About You" optional value={preferences.hint ?? ""} placeholder="We met at the coffee shop..."
                    infoText="Give them a clue to guess who you are" onChange={(value) => updatePreference({ hint: value })} />

                <InputField id="email" label="Your Email" type="email" value={preferences.email} placeholder="your@email.com"
                    infoText="We'll notify you if they reply. Never shared without your consent." onChange={(value) => updatePreference({ email: value })} />
            </section>

            <section className="flex justify-between items-center mt-14 mb-8 font-semibold text-[11px] md:text-xs xl:text-sm">
                <button onClick={() => goBack(1)} className={`${buttonBaseClass} hover:border-destructive hover:text-destructive`}>
                    <ArrowLeft className="size-4" />
                    Back
                </button>

                <div className="flex gap-x-2 ml-auto">
                    <button onClick={clear} className={`${buttonBaseClass} hover:border-destructive hover:text-destructive`}>
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
};

export default Form1;