import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Constants
import { LOVE_ICONS } from "@/constants/editing";

// Icons
import { MessageEdit } from "iconsax-reactjs";


type Particle = {
    id: number;
    icon: string;
    x: number;
    y: number;
};

const index = () => {

    const [particles, setParticles] = useState<Particle[]>([]);
    const intervalRef = useRef<number | null>(null);

    const spawnParticle = () => {
        const id = Date.now() + Math.random();

        setParticles((prev) => [
            ...prev,
            {
                id,
                icon: LOVE_ICONS[Math.floor(Math.random() * LOVE_ICONS.length)],
                x: Math.random() * 40 - 20,
                y: Math.random() * -40 - 20,
            },
        ]);

        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 500);
    };

    // Functions
    const handleHoverStart = () => {
        if (intervalRef.current) return;

        spawnParticle();
        intervalRef.current = window.setInterval(spawnParticle, 200);
    };

    const handleHoverEnd = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <main className="relative place-content-center grid bg-[url('https://res.cloudinary.com/dpmx02shl/image/upload/v1770472324/cupiddart/landing/landingPage_aweo0t.svg')] bg-cover bg-no-repeat w-full h-dvh overflow-hidden">
            <img src="/logo.svg" alt="Cupid Dart Logo" className="top-2 left-1/2 absolute w-20 md:w-24 xl:w-28 -translate-x-1/2" />
            <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1770472331/cupiddart/landing/topLeft_ohppwv.svg" alt="heart image" className="top-0 left-0 absolute h-52 sm:h-64 md:h-80 lg:h-fit" />
            <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1770472331/cupiddart/landing/topRight_ltzyvn.svg" alt="heart image" className="top-0 -right-10 sm:-right-6 md:-right-2 lg:right-0 absolute h-36 sm:h-52 md:h-72 lg:h-fit" />
            <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1770472324/cupiddart/landing/bottomLeft_us2bye.svg" alt="heart image" className="bottom-0 -left-10 absolute h-40 sm:h-48 md:h-64 lg:h-72 xl:h-fit" />
            <img src="https://res.cloudinary.com/dpmx02shl/image/upload/v1770472323/cupiddart/landing/bottomRight_f7twpu.svg" alt="heart image" className="-right-14 xl:right-0 bottom-0 absolute w-44 sm:w-60 lg:w-fit h-32 sm:h-40 md:h-44 lg:h-fit" />
            <div className="space-y-2 text-center">
                <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Write Romantic</h1>
                <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Love Letters</h1>
                <p className="max-w-[40ch] md:max-w-[50ch] font-medium text-[#F0BBD4]">Express your feelings anonymously or reveal yourself when the moment is right. Let them know someone special is thinking of them.</p>

                <motion.div className="relative mx-auto mt-10 w-fit" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to="/compose" className="flex items-center gap-x-1 bg-white px-6 py-3 rounded-4xl font-semibold text-destructive"><MessageEdit variant="Bold" className="size-4 md:size-5 xl:size-6" />Write Letter</Link>
                    <AnimatePresence>
                        {particles.map((p) => (
                            <motion.span key={p.id} initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }} animate={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                                exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.4, ease: "easeOut" }} className="top-0 left-1/2 absolute text-xl -translate-x-1/2 pointer-events-none">
                                {p.icon}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}

export default index;