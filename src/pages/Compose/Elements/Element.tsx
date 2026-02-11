import { nanoid } from "nanoid";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Stores and Constants
import { useEditorStore } from "@/stores/editor.store";
import { FRAMES, PAPERS, STICKERS } from "@/constants/editing";

// Icons
import { CloseCircle } from "iconsax-reactjs";

const PREV_STICKERS = [STICKERS[2], STICKERS[6], STICKERS[5], STICKERS[4], STICKERS[0]];
const OTHER_STICKERS = STICKERS.filter(sticker => !PREV_STICKERS.includes(sticker));

const Element = ({ zIndex, onClose }: { zIndex: number, onClose: () => void }) => {

    const { setPaper, addSticker } = useEditorStore();
    const [show, setShow] = useState<boolean>(false);

    // Functions
    const toggleShow = () => setShow((prev) => !prev);

    function handleAdd(sticker: (typeof STICKERS)[number]) {
        addSticker({
            id: nanoid(),
            assetUrl: sticker.assetUrl,
            x: 50 - sticker.defaultWidth / 2,
            y: 50 - sticker.defaultHeight / 2,
            width: sticker.defaultWidth,
            height: sticker.defaultHeight,
            rotation: 0,
        });
        onClose();
    }

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex justify-center items-center bg-black/40 p-2 w-full h-full" style={{ zIndex }} onClick={onClose}>
                <motion.main initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative bg-white p-4 md:p-5 xl:p-6 rounded-4xl" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="group -top-10 right-0 absolute flex items-center gap-x-1 bg-[#F0F0F0]/90 hover:bg-destructive px-2 py-1 rounded-4xl hover:text-white duration-200 cursor-pointer">
                        <CloseCircle variant="Bold" className="size-4 text-[#DB2863] group-hover:text-white" />
                        <p className="text-[8px] md:text-[9px] xl:text-[10px]">Close</p>
                    </button>

                    <p className="font-bold text-[10px] md:text-[11px] xl:text-xs">Elements</p>
                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Paper (5)</p>
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {PAPERS.map((paper, index) => (
                                <img onClick={() => setPaper(paper)} key={`paper_${index}`} src={paper} alt={`paper-${index}`} className="border border-[#E5E7E3] w-10 md:w-12 xl:w-14 h-12 md:h-14 xl:h-16 cursor-pointer" />
                            ))}
                        </div>
                    </section>

                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Image Frame (5) <span className="text-destructive">Coming Soon</span></p>
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {FRAMES.map((frame, index) => (
                                <img key={`frame_${index}`} src={frame} alt={`frame-${index}`} className={`${index === 4 ? "bg-destructive shadow-md border border-[#E5E7E3]" : ""} w-10 md:w-12 xl:w-14 h-12 md:h-14 xl:h-16 cursor-not-allowed`} />
                            ))}
                        </div>
                    </section>
                    
                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Stickers (18)</p>
                            <p onClick={toggleShow} className="font-medium text-[8px] text-destructive md:text-[9px] xl:text-[10px] cursor-pointer">
                                {show ? "Close" : "See all"}
                            </p>
                        </div>
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {PREV_STICKERS.map((sticker, index) => (
                                <img onClick={() => handleAdd(sticker)} key={`prev_sticker_${index}`} src={sticker.assetUrl} className="size-12 cursor-pointer" alt={`sticker-${index}`} />
                            ))}
                            {show && OTHER_STICKERS.map((sticker, index) => (
                                <img onClick={() => handleAdd(sticker)} key={`sticker_${index}`} src={sticker.assetUrl} className="size-12 cursor-pointer" alt={`sticker-${index}`} />
                            ))}
                        </div>
                    </section>
                </motion.main>
            </motion.div>
        </AnimatePresence>
    );
}

export default Element;