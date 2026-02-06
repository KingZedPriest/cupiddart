export function LetterRenderer({ layout }: { layout: LetterLayout }) {
    return (
        <div className="relative w-full max-w-114.75 h-162.5">
            {/* background */}
            {layout.background.type === "color" && (
                <div className="absolute inset-0" style={{ background: layout.background.value }} />
            )}

            {/* stickers */}
            {layout.stickers.map((s) => (
                <img key={s.id} src={s.assetUrl} className="absolute"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.width}%`,
                        height: `${s.height}%`,
                        transform: `rotate(${s.rotation}deg)`,
                        zIndex: s.zIndex,
                    }}
                />
            ))}
        </div>
    );
}
