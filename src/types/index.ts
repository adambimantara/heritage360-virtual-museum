export type ArtKind = "keris" | "pamor" | "topeng" | "kawung" | "parang" | "lurik";

export type Visual =
  | { kind: "photo"; src: string; alt: string; note?: string }
  | { kind: "art"; art: ArtKind; alt: string; note?: string };

export type Category =
  | "Senjata Tradisional"
  | "Topeng Tradisional"
  | "Tekstil Tradisional"
  | "Kriya Tradisional"
  | "Warisan Budaya"
  | "Seni Pertunjukan";

export type Origin =
  | "Kraton Yogyakarta"
  | "Kota Yogyakarta"
  | "Gunungkidul"
  | "Bantul"
  | "Sleman"
  | "Kotagede";

export type VideoInfo = {
  title: string;
  duration: number;
  videoUrl?: string;
  youtubeId?: string;
  thumb?: string;
  thumbNote?: string;
  cues?: Cue[];
};

export type Collection = {
  id: string;
  no: string;
  name: string;
  localName: string;
  category: Category;
  origin: string;
  short: string;
  history: string;
  philosophy: string;
  material: string;
  technique: string;
  visual: Visual;
  gallery: Visual[];
  has3D: boolean;
  model3D?: string;
  hasVideo?: boolean;
  video?: VideoInfo;
  audioNarration?: string[];
  addedAt: string;
};

export type StoryCategory = "Sejarah" | "Filosofi" | "Seni Tradisional" | "Warisan Budaya";

export type Story = {
  id: string;
  title: string;
  category: StoryCategory;
  summary: string;
  readTime: string;
  visual: Visual;
  related: string;
  body: string[];
};

export type Cue = {
  at: number;
  id: string;
  en: string;
};

export type Documentary = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  thumb: string;
  thumbNote: string;
  cues: Cue[];
  relatedArtifactId?: string;
  youtubeId?: string;
};

export type HotspotId = string;

export type Hotspot = {
  id: HotspotId;
  label: string;
  title: string;
  text: string;
};
