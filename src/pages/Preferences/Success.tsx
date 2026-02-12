import { useEffect } from "react";
import confetti from "canvas-confetti";
import { toast } from "react-fox-toast";
import { Link } from "@tanstack/react-router";

// Icons
import { ArrowRight } from "iconsax-reactjs";

const buttonBaseClass =
    "flex items-center gap-x-2 px-4 py-2.5 border border-[#E8E8E8] rounded-4xl duration-200 cursor-pointer";

const Success = () => {

    useEffect(() => {
        // Center explosion first
        confetti({
            particleCount: 120,
            spread: 90,
            startVelocity: 55,
            origin: { x: 0.5, y: 0.5 },
        });

        // Then confetti rain
        const duration = 3500;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(() => {
            if (Date.now() > animationEnd) {
                clearInterval(interval);
                return;
            }

            confetti({
                particleCount: 120,
                spread: 360,
                startVelocity: 30,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2,
                },
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-4xl w-full max-w-136.5 max-h-174">
            <img src="/send.svg" alt="Send" />

            <div className="mt-8">
                <h1 className="font-bold text-black text-lg md:text-xl xl:text-2xl">
                    Your letter is on it’s way!!!
                </h1>
                <p className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    We’ll notify you if they reply or request a reveal. The excitement begins.
                </p>
            </div>

            <p className="mt-8 font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                Create a password to view your messages
            </p>

            <div className="flex items-center gap-x-5 my-4 md:mb-0 font-semibold text-[11px] md:text-xs xl:text-sm">
                <button onClick={() => toast.info("Coming Soon !!!")}
                    className="flex items-center gap-x-2 bg-destructive hover:bg-inherit px-4 py-2.5 hover:border hover:border-destructive rounded-4xl text-white hover:text-destructive duration-200 cursor-pointer">
                    Create Password
                    <ArrowRight className="size-4" />
                </button>

                <Link to="/compose" className={`${buttonBaseClass} block hover:border-destructive hover:text-destructive`}>
                    Skip For Now
                </Link>
            </div>
        </main>
    );
};

export default Success;
