import { useRef } from "react";

// Store
import { useEditorStore } from "@/stores/editor.store";

// Icon
import { ArrowDown2, Calendar1, Timer1 } from "iconsax-reactjs";

const SchedulePicker = () => {

    const { layout, updatePreference } = useEditorStore();
    const preferences = layout.preferences;

    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

    // Safely parse date
    const parsedDate = preferences.date
        ? new Date(preferences.date) : null;

    const formattedDate = parsedDate ? parsedDate.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
    }) : "Select Date";

    const formattedTime = preferences.time ? new Date(`1970-01-01T${preferences.time}`)
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Select time";

    const shortTZ = new Intl.DateTimeFormat("en-US", {
        timeZoneName: "short",
    }).formatToParts(new Date()).find((part) => part.type === "timeZoneName")?.value;

    return (
        <div className="relative flex gap-x-4 mt-2 font-medium text-[10px] md:text-[11px] xl:text-xs">
            {/* DATE */}
            <div className="relative">
                <button type="button" onClick={() => dateInputRef.current?.showPicker()}
                    className="flex items-center gap-x-2 px-2 sm:px-3 py-3 border border-black/8 rounded-xl transition cursor-pointer">
                    <Calendar1 className="size-4 md:size-5" />
                    <span className="font-medium">
                        {formattedDate}
                    </span>
                    <ArrowDown2 className="size-4 text-faint-foreground" />
                </button>

                {/* Hidden Native Date Input */}
                <input ref={dateInputRef} type="date" className="absolute opacity-0 pointer-events-none"
                    onChange={(e) => {
                        updatePreference({ date: e.target.value });
                    }}
                />
            </div>

            {/* TIME */}
            <div className="relative">
                <button type="button" onClick={() => timeInputRef.current?.showPicker()}
                    className="flex items-center gap-x-2 px-2 sm:px-3 py-3 border border-black/8 rounded-xl transition cursor-pointer">
                    <Timer1 className="size-4 md:size-5" />
                    <span className="font-medium">
                        {formattedTime}
                    </span>
                    <span>
                        ({shortTZ})
                    </span>
                    <ArrowDown2 className="size-4 text-faint-foreground" />
                </button>

                {/* Hidden Native Time Input */}
                <input ref={timeInputRef} type="time" className="absolute opacity-0 pointer-events-none"
                    onChange={(e) => {
                        updatePreference({ time: e.target.value });
                    }}
                />
            </div>
        </div>
    );
};

export default SchedulePicker;
