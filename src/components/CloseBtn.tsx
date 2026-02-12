// Icons
import { CloseCircle } from "iconsax-reactjs";

const CloseBtn = ({ onClose, title }: { onClose: () => void, title: string }) => {
    return (
        <button onClick={onClose} className="group -top-10 right-0 absolute flex items-center gap-x-1 bg-[#F0F0F0]/90 hover:bg-destructive px-2 py-1 rounded-4xl outline-0 ring-0 hover:text-white duration-200 cursor-pointer">
            <CloseCircle variant="Bold" className="size-4 text-[#DB2863] group-hover:text-white" />
            <p className="text-[8px] md:text-[9px] xl:text-[10px]">{title}</p>
        </button>
    );
}

export default CloseBtn;