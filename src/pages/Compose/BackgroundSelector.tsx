import { AnimatePresence, motion } from "framer-motion";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// Icons
import { CloseCircle } from "iconsax-reactjs";

const COLOURS = ["#EEE5F7", "#CAA8F5", "#D90368", "#8125AF", "#66ADFF"];
const STATIC = ["/background/static/static.jpg", "/background/static/static1.png", "/background/static/static2.jpg", "/background/static/static3.jpg", "/background/static/static4.jpg"]
const ANIMATED = [
    { preview: "/background/animated/animated.png", video: "/background/animated/animated.mp4" },
    { preview: "/background/animated/animated1.png", video: "/background/animated/animated1.mp4" },
    { preview: "/background/animated/animated2.png", video: "/background/animated/animated2.mp4" },
    { preview: "/background/animated/animated3.png", video: "/background/animated/animated3.mp4" },
    { preview: "/background/animated/animated4.png", video: "/background/animated/animated4.mp4" },
    { preview: "/background/animated/animated5.png", video: "/background/animated/animated5.mp4" }
]

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
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {COLOURS.map((colour, index) => (
                                <div key={`colour_${index}`} style={{ backgroundColor: colour }} className={`w-18 h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "color", value: colour })}></div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Static</p>
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {STATIC.map((image, index) => (
                                <img key={`image_${index}`} src={image} alt={`image-${index}`} className={`w-18 h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "image", assetUrl: image })} />
                            ))}
                        </div>
                    </section>
                    <section className="mt-6 md:mt-7 xl:mt-8">
                        <p className="font-medium text-[8px] md:text-[9px] xl:text-[10px] text-accent-foreground/40">Animated</p>
                        <div className="gap-8 grid grid-cols-5 mt-2">
                            {ANIMATED.map((video, index) => (
                                <img key={`video_${index}`} src={video.preview} alt={`video-${index}`} className={`w-18 h-10 cursor-pointer rounded-2xl`} onClick={() => setBackground({ type: "video", assetUrl: video.video, loop: true })} />
                            ))}
                        </div>
                    </section>
                </motion.main>
            </motion.div>
        </AnimatePresence>
    );
}