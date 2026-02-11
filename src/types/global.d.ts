// Backgrounds
declare type Background =
  | { type: "color"; value: string }
  | { type: "image"; assetUrl: string }
  | { type: "video"; assetUrl: string; loop: boolean };

// Stickers
declare type Sticker = {
  id: string;
  assetUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
};

declare type Picture = {
  id: string;
  frame: string
  assetUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

// Font
declare type Font = {
  id: string;
  label: string;
  fontFamily: string;
  horizontalAlign: "left" | "right" | "center";
  verticalAlign: string;
  size: number;
};

// Preferences
declare type Preferences = {
  reveal: "now" | "later" | "never";
  send: "now" | "later";
  date?: string;
  time?: string;
  recipientEmail: string;
  name: string;
  hint?: string;
  email: string;
}

// Letter Layout
declare type LetterLayout = {
  currentZIndex: number;
  title: string;
  body: string;
  media: Picture[];
  paper: string;
  background: Background;
  stickers: Sticker[];
  font: Font;
  preview: boolean;
  preferences: Preferences;
};
