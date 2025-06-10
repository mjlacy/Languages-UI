import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { LanguageService } from "@services/language.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Language, LanguageForm } from "@models/language.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { globals } from "@environments/globals";
import { InvalidErrorStateMatcher } from "../shared/error-state-matchers/invalid-error-state-matcher";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: "app-add-language",
    templateUrl: "./add-language.component.html",
    styleUrl: "./add-language.component.scss",
    standalone: false
})
export class AddLanguageComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  destroy$: Subject<void> = new Subject<void>();
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({} as LanguageForm);
  matcher: InvalidErrorStateMatcher = new InvalidErrorStateMatcher();
  startOf1900: Date = new Date(0, 0, 1, 0, 0, 0);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private languageService: LanguageService = inject(LanguageService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(): void {
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

  getLanguageFromForm(): Language {
    return {
      name: (this.form.get("name") as FormControl<string>).value,
      creators: (this.form.get("creators") as FormArray<FormControl<string>>).value,
      extensions: (this.form.get("extensions") as FormArray<FormControl<string>>).value,
      firstAppeared: (this.form.get("firstAppeared") as FormControl<Date>).value,
      year: (this.form.get("year") as FormControl<number>).value,
      wiki: (this.form.get("wiki") as FormControl<string>).value
    };
  }

  onSubmit(): void {
    this.languageService.addLanguage(this.getLanguageFromForm())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (_: null) => {
          this.router.navigate(["/"]);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
  }

  cancelSubmission(): void {
    this.router.navigate(["/"]);
  }
}
