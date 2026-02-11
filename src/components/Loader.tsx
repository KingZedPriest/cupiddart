import { motion } from "framer-motion";

const Loading = ({ message }: { message: string }) => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center">
            <img src="/logo.svg" alt="Cupid Dart Logo" className="w-20 md:w-24 xl:w-28" />

            <p className="mt-2 text-black/30">
                {message}
            </p>

            <div className="bg-gray-200 mt-4 rounded-full w-56 h-2 overflow-hidden">
                <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "easeInOut",
                    }}
                    className="bg-linear-to-r from-[#D90368] to-[#8125AF] rounded-full w-1/2 h-full"
                />
            </div>
        </div>
    );
};

export default Loading;
