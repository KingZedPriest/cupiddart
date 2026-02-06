import { motion, AnimatePresence } from "framer-motion";

// Stores
import { useEditorStore } from "@/stores/editor.store";

export default function ThemePicker({ open }: { open: boolean }) {
    const setBackground = useEditorStore((s) => s.setBackground);

    return (
        <AnimatePresence>
            {open && (
                <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }} className="bottom-0 fixed inset-x-0 bg-white p-4 rounded-t-xl" >
                    <button onClick={() => setBackground({ type: "color", value: "#fde68a" })}>
                        Yellow
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
