import { useState } from "react";

// Constants and Stores
import { FONTS } from "@/constants/fonts";
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { ArrowDown2, Add, Minus, AlignLeft, AlignTop, AlignRight, AlignHorizontally, AlignBottom, AlignVertically, } from "iconsax-reactjs";

type OpenOption = "font" | "size" | "horizontal" | "vertical" | null;

const SmFont = () => {

    const { layout, updateFont } = useEditorStore();
    const { font: currentFont } = layout;

    const [open, setOpen] = useState<OpenOption>(null);

    const toggleOpen = (option: OpenOption) => {
        setOpen((prev) => (prev === option ? null : option));
    };

    return (
        <main className="flex items-center gap-x-2 h-full">
            {/* Font selector */}
            <button onClick={() => toggleOpen("font")} style={{ fontFamily: currentFont.fontFamily }}
                className={`flex items-center gap-x-2 px-2 py-1 border rounded-4xl cursor-pointer duration-200 ${open === "font"
                    ? "border-destructive" : "border-[#E5E7E3] hover:text-destructive"}`}>
                {currentFont.label}
                <ArrowDown2 className={`size-4 duration-200 ${open === "font" ? "rotate-180" : "rotate-0"}`} />

                {open === "font" && (
                    <section className="bottom-14 left-[27%] absolute space-y-2 bg-white p-2 rounded-xl min-w-32 text-left">
                        {FONTS.map((font) => (
                            <p key={font.id} onClick={() => updateFont(font)} style={{ fontFamily: font.fontFamily }}
                                className={`px-2 py-1 rounded-lg outline-none hover:bg-[#F0F0F0] ${font.fontFamily === currentFont.fontFamily
                                    ? "border border-destructive text-destructive" : ""}`}>
                                {font.label}
                            </p>
                        ))}
                    </section>
                )}
            </button>

            {/* Font size */}
            <div className={`flex items-center gap-x-2 px-2 py-1 border rounded-4xl ${open === "size" ? "border-destructive" : "border-[#E5E7E3]"}`}>
                <button onClick={() => updateFont({ size: currentFont.size - 1 })} className="hover:text-destructive duration-200 cursor-pointer">
                    <Minus className="size-5" />
                </button>

                <p>{currentFont.size}</p>

                <button onClick={() => updateFont({ size: currentFont.size + 1 })} className="hover:text-destructive duration-200 cursor-pointer" >
                    <Add className="size-5" />
                </button>
            </div>

            {/* Horizontal alignment */}
            <div onClick={() => toggleOpen("horizontal")} className={`grid place-content-center size-8 border rounded-full cursor-pointer duration-200 ${open === "horizontal"
                ? "border-destructive" : "border-[#E5E7E3] hover:text-destructive"}`}>
                {currentFont.horizontalAlign === "center" ?
                    <AlignHorizontally className="size-5" /> : currentFont.horizontalAlign === "right" ?
                        <AlignRight className="size-5" /> : <AlignLeft className="size-5" />}

                {open === "horizontal" && (
                    <section className="bottom-14 left-[55%] absolute flex gap-x-2 bg-white p-1 rounded-full">
                        <AlignButton highlight={currentFont.horizontalAlign === "left"} onClick={() => updateFont({ horizontalAlign: "left" })}>
                            <AlignLeft className="size-5" />
                        </AlignButton>

                        <AlignButton highlight={currentFont.horizontalAlign === "center"} onClick={() => updateFont({ horizontalAlign: "center" })}>
                            <AlignHorizontally className="size-5" />
                        </AlignButton>

                        <AlignButton highlight={currentFont.horizontalAlign === "right"} onClick={() => updateFont({ horizontalAlign: "right" })}>
                            <AlignRight className="size-5" />
                        </AlignButton>
                    </section>
                )}
            </div>

            {/* Vertical alignment */}
            <div onClick={() => toggleOpen("vertical")} className={`grid place-content-center size-8 border rounded-full cursor-pointer duration-200 ${open === "vertical"
                ? "border-destructive" : "border-[#E5E7E3] hover:text-destructive"}`}>
                {currentFont.verticalAlign === "center" ?
                    <AlignVertically className="size-5" /> : currentFont.verticalAlign === "flex-end" ?
                        <AlignBottom className="size-5" /> : <AlignTop className="size-5" />}

                {open === "vertical" && (
                    <section className="bottom-14 left-[62%] absolute flex gap-x-2 bg-white p-1 rounded-full">
                        <AlignButton highlight={currentFont.verticalAlign === "flex-start"} onClick={() => updateFont({ verticalAlign: "flex-start" })}>
                            <AlignTop className="size-5" />
                        </AlignButton>

                        <AlignButton highlight={currentFont.verticalAlign === "center"} onClick={() => updateFont({ verticalAlign: "center" })}>
                            <AlignVertically className="size-5" />
                        </AlignButton>

                        <AlignButton highlight={currentFont.verticalAlign === "flex-end"} onClick={() => updateFont({ verticalAlign: "flex-end" })}>
                            <AlignBottom className="size-5" />
                        </AlignButton>
                    </section>
                )}
            </div>
        </main>
    );
};

export default SmFont;

const AlignButton = ({ highlight, onClick, children }: { highlight: boolean, onClick: () => void; children: React.ReactNode }) => (
    <div onClick={onClick} className={`place-content-center grid ${highlight ? "border-destructive text-destructive" : "border-[#E5E7E3] hover:border-destructive hover:text-destructive"} border rounded-full size-8 duration-200 cursor-pointer`}>
        {children}
    </div>
);
