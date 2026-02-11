import { AnimatePresence, motion } from "framer-motion";

// Stores and Constants
import { useEditorStore } from "@/stores/editor.store";
import { ANIMATED, COLOURS, STATIC } from "@/constants/editing";

// Icons
import { CloseCircle } from "iconsax-reactjs";



export default function BackgroundSelector({ zIndex, onClose }: { zIndex: number, onClose: () => void }) {

    const setBackground = useEditorStore((s) => s.setBackground);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex justify-center items-center bg-black/40 p-2 w-full h-full" style={{ zIndex }} onClick={onClose}>
                <motion.main initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative bg-white p-4 md:p-5 xl:p-6 rounded-4xl" onClick={(e) => e.stopPropagation()}>

                    <button onClick={onClose} className="group -top-10 right-0 absolute flex items-center gap-x-1 bg-[#F0F0F0]/90 hover:bg-destructive px-2 py-1 rounded-4xl hover:text-white duration-200 cursor-pointer">
                        <CloseCircle variant="Bold" className="size-4 text-[#DB2863] group-hover:text-white" />
                        <p className="text-[8px] md:text-[9px] xl:text-[10px]">Close</p>
                    </button>

                    <p className="font-bold text-[10px] md:text-[11px] xl:text-xs">Background Themes</p>

                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Colour</p>
                        <div className="gap-3 sm:gap-5 grid grid-cols-5 mt-2">
                            {COLOURS.map((colour, index) => (
                                <div key={`colour_${index}`} style={{ backgroundColor: colour }} className={`w-full h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "color", value: colour })}></div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Static</p>
                        <div className="gap-3 sm:gap-5 grid grid-cols-5 mt-2">
                            {STATIC.map((image, index) => (
                                <img key={`image_${index}`} src={image} alt={`image-${index}`} className={`w-full h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "image", assetUrl: image })} />
                            ))}
                        </div>
                    </section>
                    
                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Animated</p>
                        <div className="gap-3 sm:gap-5 grid grid-cols-5 mt-2">
                            {ANIMATED.map((video, index) => (
                                <img key={`video_${index}`} src={video.preview} alt={`video-${index}`} className={`w-full h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "video", assetUrl: video.video, loop: true })} />
                            ))}
                        </div>
                    </section>
                </motion.main>
            </motion.div>
        </AnimatePresence>
    );
}