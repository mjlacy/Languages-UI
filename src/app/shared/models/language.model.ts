export interface Languages {
  languages: Language[];
}

export interface Language {
  _id: string;
  name: string;
  creators: string[];
  extensions: string;
  firstAppeared: Date;
  year: number;
  wiki: string;
}
