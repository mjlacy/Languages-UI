import { FormArray, FormControl } from "@angular/forms";

export interface Languages {
  languages: Language[];
}

export interface Language {
  _id?: string;
  name: string;
  creators: string[];
  extensions: string[];
  firstAppeared: Date;
  year: number;
  wiki: string;
}

export interface LanguageForm {
  name: FormControl<string>;
  creators: FormArray<FormControl<string>>;
  extensions: FormArray<FormControl<string>>;
  firstAppeared: FormControl<Date>;
  year: FormControl<number>;
  wiki: FormControl<string>;
}