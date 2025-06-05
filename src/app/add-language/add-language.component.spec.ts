import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddLanguageComponent } from "./add-language.component";
import { LanguageService } from "@services/language.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { globals } from "@environments/globals";
import { Language, LanguageForm } from "@models/language.model";
import { of, throwError } from "rxjs";
import { Router, RouterModule } from "@angular/router";

describe("AddLanguageComponent", () => {
  let component: AddLanguageComponent;
  let fixture: ComponentFixture<AddLanguageComponent>;
  let formGroup: FormGroup<LanguageForm>;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockLanguageService = jasmine.createSpyObj("LanguageService", ["addLanguage"]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddLanguageComponent],
      imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterModule.forRoot([])
      ],
      providers : [
        MatDatepickerModule,
        provideHttpClientTesting(),
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLanguageComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    formGroup = formBuilder.group<LanguageForm>({
      name: formBuilder.control("", Validators.required) as FormControl<string>,
      creators: formBuilder.array([formBuilder.control("", Validators.required)]) as FormArray<FormControl<string>>,
      extensions: formBuilder.array([formBuilder.control("", [Validators.required, Validators.pattern(globals.constants.EXTENSION_REGEX)])]) as FormArray<FormControl<string>>,
      firstAppeared: formBuilder.control("") as unknown as FormControl<Date>,
      year: formBuilder.control("", Validators.required) as unknown as FormControl<number>,
      wiki: formBuilder.control("", [Validators.required, Validators.pattern(globals.constants.URL_REGEX)]) as FormControl<string>
    });

    router = TestBed.inject(Router);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    let buildFormSpy: jasmine.Spy;

    beforeEach(() => {
      buildFormSpy = spyOn(component, "buildForm");
    });

    it("should call buildForm()", () => {
      component.ngOnInit();
      expect(buildFormSpy).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy()", () => {
    let nextSpy: jasmine.Spy;
    let completeSpy: jasmine.Spy;

    beforeEach(() => {
      nextSpy = spyOn(component.destroy$, "next");
      completeSpy = spyOn(component.destroy$, "complete");
    });

    it("should call destroy$.next()", () => {
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
    });

    it("should call destroy$.complete()", () => {
      component.ngOnDestroy();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe("buildForm()", () => {
    let groupSpy: jasmine.Spy;

    beforeEach(() => {
      groupSpy = spyOn(component.formBuilder, "group").and.returnValue(formGroup);
    });

    it("should call formBuilder.group()", () => {
      component.buildForm();
      expect(groupSpy).toHaveBeenCalled();
    });

    it("should set form", () => {
      component.buildForm();
      expect(component.form).toBe(formGroup);
    });
  });

  describe("get creators()", () => {
    it("should return creators", () => {
      component.form = formGroup;
      expect(component.creators).toBe(formGroup.get("creators") as FormArray<FormControl<string>>);
    });
  });

  describe("addCreator()", () => {
    it("should add a blank FormControl to creators FormArray", () => {
      component.form = formGroup;
      component.addCreator();

      expect(component.creators.length).toBe(2);
      expect(component.creators.at(1).value).toBe("");
      expect(component.creators.at(1).hasValidator(Validators.required)).toBeTrue();
    });
  });

  describe("removeCreator()", () => {
    it("should remove a FormControl from creators FormArray", () => {
      component.form = formGroup;
      component.removeCreator(0);
      expect(component.creators.length).toBe(0);
    });
  });

  describe("get extensions()", () => {
    it("should return extensions", () => {
      component.form = formGroup;
      expect(component.extensions).toBe(formGroup.get("extensions") as FormArray<FormControl<string>>);
    });
  });

  describe("addExtension()", () => {
    it("should add a blank FormControl to extensions FormArray", () => {
      component.form = formGroup;
      component.addExtension();
      expect(component.extensions.length).toBe(2);
      expect(component.extensions.at(1).value).toBe("");

      component.extensions.at(1).setValue("test");
      expect(component.extensions.at(1).hasValidator(Validators.required)).toBeTrue();
      expect(component.extensions?.at(1)?.errors).toEqual({
        pattern: {
          requiredPattern: `${globals.constants.EXTENSION_REGEX}`,
          actualValue: "test"
        }
      });
    });
  });

  describe("removeExtension()", () => {
    it("should remove a FormControl from extensions FormArray", () => {
      component.form = formGroup;
      component.removeExtension(0);
      expect(component.extensions.length).toBe(0);
    });
  });

  describe("getLanguageFromForm()", () => {
    it("should return a Language", () => {
      component.form = formGroup;
      component.form.get("name")?.setValue("name");
      component.form.get("creators")?.setValue(["creator"]);
      component.form.get("extensions")?.setValue(["extension"]);
      component.form.get("firstAppeared")?.setValue(new Date());
      component.form.get("year")?.setValue(1900);
      component.form.get("wiki")?.setValue("wiki");

      const expected: Language = {
        name: "name",
        creators: ["creator"],
        extensions: ["extension"],
        firstAppeared: new Date(),
        year: 1900,
        wiki: "wiki"
      };

      expect(component.getLanguageFromForm()).toEqual(expected);
    });
  });

  describe("onSubmit()", () => {
    let getLanguageFromFormSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    let errorSpy: jasmine.Spy;
    const lang: Language = {} as Language;

    beforeEach(() => {
      getLanguageFromFormSpy = spyOn(component, "getLanguageFromForm").and.returnValue(lang);
      navigateSpy = spyOn(router, "navigate");
      errorSpy = spyOn(console, "error");
      mockLanguageService.addLanguage.and.returnValue(of(null));
    });

    it("should call getLanguageFromForm()", () => {
      component.onSubmit();
      expect(getLanguageFromFormSpy).toHaveBeenCalled();
    });

    it("should call languageService.addLanguage()", () => {
      component.onSubmit();
      expect(mockLanguageService.addLanguage).toHaveBeenCalledWith(lang);
    });

    it("should call router.navigate() on success", () => {
      component.onSubmit();
      expect(navigateSpy).toHaveBeenCalledWith(["/"]);
    });

    it("should call console.error() on error", () => {
      mockLanguageService.addLanguage.and.returnValue(throwError(() => "error"));
      component.onSubmit();
      expect(errorSpy).toHaveBeenCalledWith("error");
    });
  });

  describe("cancelSubmission()", () => {
    let navigateSpy: jasmine.Spy;

    beforeEach(() =>{
      navigateSpy = spyOn(router, "navigate");
    });

    it("should call router.navigate() on success", () => {
      component.cancelSubmission();
      expect(navigateSpy).toHaveBeenCalledWith(["/"]);
    });
  });
});
