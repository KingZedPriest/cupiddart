import { create } from "zustand";

type EditorState = {
    layout: LetterLayout;

    /* content */
    setTitle: (title: string) => void;
    setBody: (body: string) => void;
    setPaper: (paper: string) => void;

    /* media */
    addMedia: (media: Picture) => void;
    updateMedia: (id: string, patch: Partial<Picture>) => void;
    removeMedia: (id: string) => void;

    /* styling */
    setBackground: (bg: Background) => void;
    updateFont: (font: Partial<Font>) => void;

    /* stickers */
    addSticker: (sticker: Sticker) => void;
    updateSticker: (id: string, patch: Partial<Sticker>) => void;
    removeSticker: (id: string) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
    layout: {
        title: "",
        body: "",
        media: [],
        paper: "/paper/paper3.png",
        background: { type: "image", assetUrl: "/background/static/pink_red.png" },
        stickers: [],
        font: {
            id: "fraunces",
            label: "Fraunces",
            fontFamily: '"Fraunces", serif',
            horizontalAlign: "left",
            verticalAlign: "",
            size: 16,
        },
    },

    /* content setters */
    setTitle: (title) =>
        set((s) => ({ layout: { ...s.layout, title } })),

    setBody: (body) =>
        set((s) => ({ layout: { ...s.layout, body } })),

    setPaper: (paper) =>
        set((s) => ({ layout: { ...s.layout, paper } })),

    /* media */
    addMedia: (picture) =>
        set((s) => ({
            layout: {
                ...s.layout,
                media: [...s.layout.media, picture],
            },
        })),

    updateMedia: (id, patch) =>
        set((s) => ({
            layout: {
                ...s.layout,
                media: s.layout.media.map((st) =>
                    st.id === id ? { ...st, ...patch } : st
                ),
            },
        })),

    removeMedia: (id) =>
        set((s) => ({
            layout: {
                ...s.layout,
                media: s.layout.media.filter((st) => st.id !== id),
            },
        })),

    /* styling */
    setBackground: (background) =>
        set((s) => ({ layout: { ...s.layout, background } })),

    updateFont: (fontPatch) =>
        set((s) => ({
            layout: {
                ...s.layout,
                font: { ...s.layout.font, ...fontPatch },
            },
        })),

    /* stickers */
    addSticker: (sticker) =>
        set((s) => ({
            layout: {
                ...s.layout,
                stickers: [...s.layout.stickers, sticker],
            },
        })),

    updateSticker: (id, patch) =>
        set((s) => ({
            layout: {
                ...s.layout,
                stickers: s.layout.stickers.map((st) =>
                    st.id === id ? { ...st, ...patch } : st
                ),
            },
        })),

    removeSticker: (id) =>
        set((s) => ({
            layout: {
                ...s.layout,
                stickers: s.layout.stickers.filter((st) => st.id !== id),
            },
        })),
}));
