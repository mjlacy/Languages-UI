import { Component, inject, OnInit } from "@angular/core";
import { LanguageService } from "../services/language.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Language, LanguageForm } from "../shared/models/language.model";
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { globals } from "@environments/globals";

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _: FormGroupDirective): boolean {
    return !!(control && control.invalid && control.touched);
  }
}

@Component({
    selector: "app-add-language",
    templateUrl: "./add-language.component.html",
    styleUrl: "./add-language.component.scss",
    standalone: false
})
export class AddLanguageComponent implements OnInit {
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({} as LanguageForm);
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  startOf1900: Date = new Date(0, 0, 1, 0, 0, 0);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private languageService: LanguageService = inject(LanguageService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.form = this.formBuilder.group<LanguageForm>({
      name: this.formBuilder.control("", Validators.required) as FormControl<string>,
      creators: this.formBuilder.array([this.formBuilder.control("", Validators.required)]) as FormArray<FormControl<string>>,
      extensions: this.formBuilder.array([this.formBuilder.control("", [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)])]) as FormArray<FormControl<string>>,
      firstAppeared: this.formBuilder.control("") as unknown as FormControl<Date>,
      year: this.formBuilder.control("", Validators.required) as unknown as FormControl<number>,
      wiki: this.formBuilder.control("", [Validators.required, Validators.pattern(globals.constants.URL_REGEX)]) as FormControl<string>
    });
  }

  get creators(): FormArray<FormControl<string>> {
    return this.form.get("creators") as FormArray<FormControl<string>>;
  }

  addCreator(): void {
    this.creators.push(this.formBuilder.control("", Validators.required) as FormControl<string>);
  }

  removeCreator(index: number): void {
    (this.form.get("creators") as FormArray<FormControl<string>>).removeAt(index);
  }

  get extensions(): FormArray<FormControl<string>> {
    return this.form.get("extensions") as FormArray<FormControl<string>>;
  }

  addExtension(): void {
    this.extensions.push(this.formBuilder.control("", [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)]) as FormControl<string>);
  }

  removeExtension(index: number): void {
    (this.form.get("extensions") as FormArray<FormControl<string>>).removeAt(index);
  }

  onSubmit(): void {
    const language: Language = {
      name: (this.form.get("name") as FormControl<string>).value,
      creators: (this.form.get("creators") as FormArray<FormControl<string>>).value,
      extensions: (this.form.get("extensions") as FormArray<FormControl<string>>).value,
      firstAppeared: (this.form.get("firstAppeared") as FormControl<Date>).value || null,
      year: (this.form.get("year") as FormControl<number>).value,
      wiki: (this.form.get("wiki") as FormControl<string>).value
    };

    this.languageService.addLanguage(language)
      .subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  cancelSubmission(): void {
    this.router.navigate(["/"]);
  }
}
