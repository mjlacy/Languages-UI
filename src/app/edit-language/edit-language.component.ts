import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Language, LanguageForm } from '../shared/models/language.model';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { globals } from '@environments/globals';
import { HttpErrorResponse } from '@angular/common/http';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _: FormGroupDirective): boolean {
    return !!(control && control.invalid && control.touched)
  }
}

@Component({
    selector: 'app-edit-language',
    templateUrl: './edit-language.component.html',
    styleUrl: './edit-language.component.scss',
    standalone: false
})
export class EditLanguageComponent implements OnInit {
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({} as LanguageForm);
  language: Language = {} as Language;
  loading: boolean = true;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  startOf1900: Date = new Date(0, 0, 1, 0, 0, 0);

  constructor(public formBuilder: FormBuilder, private languageService: LanguageService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('_id') as string;
    this.languageService.getLanguage(id)
      .subscribe({
        next: (language: Language) => {
          this.language = language;

          const creators: FormControl<string>[] = [];
          const extensions: FormControl<string>[] = [];

          this.language.creators.forEach((creator: string) => {
            creators.push(this.formBuilder.control(creator, Validators.required) as FormControl<string>)
          });

          this.language.extensions.forEach((extension: string) => {
            extensions.push(this.formBuilder.control(extension, [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)]) as FormControl<string>)
          });

          this.form = this.formBuilder.group<LanguageForm>({
            name: this.formBuilder.control(this.language.name, Validators.required) as FormControl<string>,
            creators: this.formBuilder.array(creators) as FormArray<FormControl<string>>,
            extensions: this.formBuilder.array(extensions) as FormArray<FormControl<string>>,
            firstAppeared: this.formBuilder.control(this.language.firstAppeared) as unknown as FormControl<Date>,
            year: this.formBuilder.control(this.language.year, Validators.required) as unknown as FormControl<number>,
            wiki: this.formBuilder.control(this.language.wiki, [Validators.required, Validators.pattern(globals.constants.URL_REGEX)]) as FormControl<string>,
          });

          this.loading = false;
      },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
    });
  }

  get creators(): FormArray<FormControl<string>> {
    return this.form.get('creators') as FormArray<FormControl<string>>;
  }

  addCreator(): void {
    this.creators.push(this.formBuilder.control('', Validators.required) as FormControl<string>);
  }

  removeCreator(index: number): void {
    (this.form.get('creators') as FormArray<FormControl<string>>).removeAt(index);
  }

  get extensions(): FormArray<FormControl<string>> {
    return this.form.get('extensions') as FormArray<FormControl<string>>;
  }

  addExtension(): void {
    this.extensions.push(this.formBuilder.control('', [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)]) as FormControl<string>);
  }

  removeExtension(index: number): void {
    (this.form.get('extensions') as FormArray<FormControl<string>>).removeAt(index);
  }

  onSubmit(): void {
    const language: Language = {
      _id: this.language._id,
      name: (this.form.get('name') as FormControl<string>).value,
      creators: (this.form.get('creators') as FormArray<FormControl<string>>).value,
      extensions: (this.form.get('extensions') as FormArray<FormControl<string>>).value,
      firstAppeared: (this.form.get('firstAppeared') as FormControl<Date>).value,
      year: (this.form.get('year') as FormControl<number>).value,
      wiki: (this.form.get('wiki') as FormControl<string>).value,
    };

    this.languageService.upsertLanguage(language)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  cancelSubmission(): void {
    this.router.navigate(['/']);
  }
}
