import { useRef, useEffect, useState } from "react";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import Paper from "./Paper";
import StickerItem from "./StickerItem";

const MAX_TITLE = 40;
const MAX_BODY = 1500;

export default function EditorCanvas() {
    const ref = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const { layout, setTitle, setBody } = useEditorStore();
    const font = layout.font;

    // Track when canvas has valid dimensions
    const [canvasReady, setCanvasReady] = useState<boolean>(false);

    // Initialize contentEditable once
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerText !== layout.body) {
            editorRef.current.innerText = layout.body;
        }
    }, []);

    // Observe canvas size
    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setCanvasReady(width > 0 && height > 0);
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    // Handle before input
    const handleBeforeInput = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        if (el.innerText.length >= MAX_BODY) {
            e.preventDefault();
        }
    };

    // Handle Paste
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();

        const pasteText = e.clipboardData.getData("text");
        const el = e.currentTarget;

        const existingText = el.innerText;
        const remaining = MAX_BODY - existingText.length;

        if (remaining <= 0) return;

        const textToInsert = pasteText.slice(0, remaining);

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        range.deleteContents();

        const textNode = document.createTextNode(textToInsert);
        range.insertNode(textNode);

        range.setStartAfter(textNode);
        range.setEndAfter(textNode);

        selection.removeAllRanges();
        selection.addRange(range);
    };

    // Handle Input
    const handleInput = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const text = el.innerText.slice(0, MAX_BODY);
        setBody(text);
    };

    // Handle Enter (Stop Working)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
        }
    };

    return (
        <main>
            <div ref={ref} className="relative bg-white mx-auto mt-15 border border-[#E5E7E3] w-full max-w-114.75 h-162.5">

                <Paper />

                <section className="relative p-4 md:p-5 xl:p-6">
                    <input
                        maxLength={MAX_TITLE}
                        value={layout.title}
                        type="text"
                        style={{ fontFamily: font.fontFamily }}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 focus:border focus:border-primary rounded-md outline-0 w-full placeholder:font-semibold placeholder:text-[#DDDDDD] text-base placeholder:text-base md:text-lg md:placeholder:text-lg xl:text-xl xl:placeholder:text-xl"
                        placeholder="Message Title"
                    />

                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        className="p-4 focus:border focus:border-primary rounded-sm outline-none w-full h-140 overflow-y-auto break-all hide-scrollbar editor-body"
                        style={{
                            fontFamily: font.fontFamily,
                            fontSize: font.size,
                            justifyContent: font.horizontalAlign,
                            display: "flex",
                            textAlign: font.horizontalAlign,
                            alignItems: font.verticalAlign,
                        }}
                        data-placeholder="Write A Message"
                        onBeforeInput={handleBeforeInput}
                        onPaste={handlePaste}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                </section>

                {/* Render stickers only when canvas is ready */}
                {canvasReady &&
                    layout.stickers.map((s) => (
                        <StickerItem key={s.id} sticker={s} parentRef={ref} />
                    ))}
            </div>

            <p className="relative my-4 font-medium text-[#4F4F4F] text-[10px] md:text-[11px] xl:text-xs text-center">
                Word Count: {layout.body.length}/{MAX_BODY}
            </p>
        </main>
    );
}
