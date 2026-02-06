import { useState } from "react";

// UIs
import Tag from "@/components/Tag";
import Element from "./Elements/Element";
import BackgroundSelector from "./BackgroundSelector";

// Icons
import { ArrowRight, ElementPlus, ArrowDown2, Add, Minus, Text, AlignLeft, AlignTop } from "iconsax-reactjs";

const Select = () => {

    const [options, setOptions] = useState<"bg" | "elements" | "text" | null>(null);

    // Functions
    const toggleOption = (option: "bg" | "elements" | "text" | null) => {
        setOptions(prevOption => (prevOption === option ? null : option));
    };

    const zIndex = Date.now();

    return (
        <>
            <main className="relative flex justify-between gap-x-3 bg-white drop-shadow-lg mx-auto mt-20 rounded-4xl w-fit">
                <div className="flex items-center gap-x-2 p-1">
                    <div onClick={() => toggleOption("bg")} className={`bg-[#8125AF] relative rounded-full size-8 cursor-pointer border ${options === "bg" ? "border-destructive" : "border-[#E5E7E3]"}`}>
                        {options === "bg" && <Tag text="Background Themes" />}
                    </div>
                    <div onClick={() => toggleOption("elements")} className={`size-8 relative border rounded-full grid place-content-center cursor-pointer ${options === "elements" ? "border-destructive" : "border-[#E5E7E3]"}`}>
                        <ElementPlus className="size-5" />
                        {options === "elements" && <Tag text="Elements" />}
                    </div>
                    <div onClick={() => toggleOption("text")} className={`size-8 relative border rounded-full grid place-content-center cursor-pointer ${options === "text" ? "border-destructive" : "border-[#E5E7E3]"}`}>
                        <Text className="size-5" />
                        {options === "text" && <Tag text="Text Style" />}
                    </div>
                </div>
                <div className="bg-[#E5E7E3] w-0.5"></div>

                {/* {options === "text" &&

                } */}

                <div className="bg-[#E5E7E3] w-0.5"></div>
                <div className="p-1">
                    <button className="flex items-center gap-x-2 bg-destructive hover:bg-white px-3 py-2 border border-destructive rounded-full text-white hover:text-destructive duration-200 cursor-pointer">
                        Continue
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </main>
            {options === "bg" && <BackgroundSelector zIndex={zIndex} onClose={() => toggleOption(null)} />}
            {options === "elements" && <Element zIndex={zIndex} onClose={() => toggleOption(null)} />}
        </>
    );
}

export default Select;