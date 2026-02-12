import { useState, useEffect } from "react";
import { Route } from "@/routes/preferences";
import { useRouter } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

// Stores
import { useEditorStore } from "@/stores/editor.store";

// UIs
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import CloseBtn from "@/components/CloseBtn";
import Success from "./Success";

// Icons
import { ArrowLeft, ArrowRight } from "iconsax-reactjs";

const buttonBaseClass =
    "flex items-center gap-x-2 px-4 py-2.5 border border-[#E8E8E8] rounded-4xl duration-200 cursor-pointer";

const Form2 = () => {

    const router = useRouter();
    const [value, setValue] = useState("");
    const [timer, setTimer] = useState<number>(180);
    const navigate = useNavigate({ from: Route.fullPath });
    const [canResend, setCanResend] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const { preferences } = useEditorStore((s) => s.layout);

    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    //Functions
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const reset = () => {
        setCanResend(false);
        setTimer(180);
    }

    const goBack = (page: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                page,
            }),
        });
    };

    return (
        <>
            {isSuccess ?
                <Success />
                :
                <main className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-4xl w-full max-w-136.5 max-h-174">

                    <CloseBtn onClose={() => router.history.back()} title="Cancel" />

                    <img src="/verify.svg" alt="Envelope" />

                    <div className="mt-8">
                        <h1 className="font-bold text-black text-lg md:text-xl xl:text-2xl">Verify it’s you</h1>
                        <p className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">we sent a 6-digit code to <span className="font-semibold text-foreground">{preferences.email}</span></p>
                    </div>
                    <div className="my-10">
                        <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                            <InputOTPSlot className="border-black/8" index={0} />
                            <InputOTPSlot className="border-black/8" index={1} />
                            <InputOTPSlot className="border-black/8" index={2} />
                            <InputOTPSlot className="border-black/8" index={3} />
                            <InputOTPSlot className="border-black/8" index={4} />
                            <InputOTPSlot className="border-black/8 rounded-r-xl" index={5} />
                        </InputOTP>
                    </div>
                    <div className="flex gap-x-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        Didn’t receive the code?
                        <button disabled={timer > 0 || canResend === false} className="outline-0 focus:ring-0 font-semibold text-destructive hover:text-primary duration-200 cursor-pointer">
                            {canResend ? "Resend" : `You can resend in ${formatTime(timer)}`}
                        </button>
                    </div>
                    <div className="flex justify-between mt-14 mb-4 md:mb-0 font-semibold text-[11px] md:text-xs xl:text-sm">
                        <button onClick={() => goBack(1)} className={`${buttonBaseClass} hover:border-destructive hover:text-destructive`}>
                            <ArrowLeft className="size-4" />
                            Back
                        </button>
                        <button className="flex items-center gap-x-2 bg-destructive hover:bg-inherit px-4 py-2.5 hover:border hover:border-destructive rounded-4xl text-white hover:text-destructive duration-200 cursor-pointer">
                            Verify and Send
                            <ArrowRight className="size-4" />
                        </button>
                    </div>
                </main>
            }
        </>

    );
}

export default Form2;