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
    addSticker: (sticker: Omit<Sticker, "zIndex">) => void;
    updateSticker: (id: string, patch: Partial<Sticker>) => void;
    removeSticker: (id: string) => void;

    // Preview
    editPreview: (value: boolean) => void;

    // Preferences
    updatePreference: (preference: Partial<Preferences>) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
    layout: {
        currentZIndex: 1,
        title: "",
        body: "",
        media: [],
        paper: "https://res.cloudinary.com/dpmx02shl/image/upload/v1770471649/cupiddart/paper/paper3_rraswc.png",
        background: { type: "image", assetUrl: "https://res.cloudinary.com/dpmx02shl/image/upload/v1770471639/cupiddart/background/static/static1_spenue.png" },
        stickers: [],
        font: {
            id: "fraunces",
            label: "Fraunces",
            fontFamily: '"Fraunces", serif',
            horizontalAlign: "left",
            verticalAlign: "",
            size: 16,
        },
        preview: false,
        preferences: {
            reveal: "now",
            send: "now",
            date: "",
            time: "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            recipientEmail: "",
            name: "",
            hint: "",
            email: "",
        }
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
        set((s) => {
            const nextZ = s.layout.currentZIndex + 1;
            return {
                currentZIndex: nextZ,
                layout: {
                    ...s.layout,
                    stickers: [
                        ...s.layout.stickers,
                        { ...sticker, zIndex: nextZ },
                    ],
                },
            };
        }),


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

    editPreview: (value) => set((s) => ({ layout: { ...s.layout, preview: value } })),

    updatePreference: (preference) =>
        set((s) => ({
            layout: {
                ...s.layout,
                preferences: { ...s.layout.preferences, ...preference },
            },
        })),
}));
