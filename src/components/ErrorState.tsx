import { AlertTriangle } from "lucide-react";

type ErrorStateProps = {
    message: string;
};

const ErrorState = ({ message }: ErrorStateProps) => {
    return (
        <div className="flex justify-center items-center px-6 min-h-[80vh]">
            <div className="shadow-sm p-4 md:p-5 xl:p-6 border border-border rounded-2xl w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <div className="flex justify-center items-center bg-destructive rounded-full size-10 md:size-12 xl:size-14">
                        <AlertTriangle className="size-5 md:size-6 xl:size-7 text-white" />
                    </div>
                </div>

                <h2 className="font-semibold text-sm md:text-base xl:text-lg">
                    Something went wrong
                </h2>

                <p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default ErrorState;
