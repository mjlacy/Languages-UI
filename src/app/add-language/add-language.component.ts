import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Language, LanguageForm } from '../shared/models/language.model';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { globals } from '@environments/globals';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _: FormGroupDirective): boolean {
    return !!(control && control.invalid && control.touched)
  }
}

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.scss'
})
export class AddLanguageComponent implements OnInit {
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({} as LanguageForm);
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(public formBuilder: FormBuilder, private languageService: LanguageService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group<LanguageForm>({
      name: this.formBuilder.control('', Validators.required) as FormControl<string>,
      creators: this.formBuilder.array([this.formBuilder.control('', Validators.required)]) as FormArray<FormControl<string>>,
      extensions: this.formBuilder.array([this.formBuilder.control('', [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)])]) as FormArray<FormControl<string>>,
      firstAppeared: this.formBuilder.control('', Validators.required) as unknown as FormControl<Date>,
      year: this.formBuilder.control('', Validators.required) as unknown as FormControl<number>,
      wiki: this.formBuilder.control('', [Validators.required, Validators.pattern(globals.constants.URL_REGEX)]) as FormControl<string>,
    });
  }

  get creators(): FormArray {
    return this.form.get('creators') as FormArray;
  }

  addCreator(): void {
    this.creators.push(this.formBuilder.control('', Validators.required));
  }

  removeCreator(index: number): void {
    (this.form.get('creators') as FormArray).removeAt(index);
  }

  get extensions(): FormArray {
    return this.form.get('extensions') as FormArray;
  }

  addExtension(): void {
    this.extensions.push(this.formBuilder.control('', Validators.required));
  }

  removeExtension(index: number): void {
    (this.form.get('extensions') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    const language: Language = {
      name: (this.form.get('name') as FormControl<string>).value,
      creators: (this.form.get('creators') as FormControl<string[]>).value,
      extensions: (this.form.get('extensions') as FormControl<string[]>).value,
      firstAppeared: (this.form.get('firstAppeared') as FormControl<Date>).value,
      year: (this.form.get('year') as FormControl<number>).value,
      wiki: (this.form.get('wiki') as FormControl<string>).value,
    };

    this.languageService.addLanguage(language)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
}
