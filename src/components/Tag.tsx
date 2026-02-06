const Tag = ({ text }: { text: string }) => {
    return (
        <main className="-top-9 left-1/2 absolute bg-foreground px-2 py-1 rounded-md font-medium text-[8px] text-white md:text-[9px] xl:text-[10px] text-nowrap -translate-x-1/2">
            {text}
        </main>
    );
}

export default Tag;