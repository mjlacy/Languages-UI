import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { EditLanguageComponent } from "./edit-language.component";
import { LanguageService } from "@services/language.service";
import { Router, RouterModule } from "@angular/router";
import { of, throwError } from "rxjs";
import { Language, LanguageForm } from "@models/language.model";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { globals } from "@environments/globals";

describe("EditLanguageComponent", () => {
  let component: EditLanguageComponent;
  let fixture: ComponentFixture<EditLanguageComponent>;
  let formGroup: FormGroup<LanguageForm>;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockLanguageService = jasmine.createSpyObj("LanguageService", ["getLanguage", "upsertLanguage"]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditLanguageComponent],
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLanguageComponent);
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
    let getLanguageSpy: jasmine.Spy;

    beforeEach(() => {
      getLanguageSpy = spyOn(component, "getLanguage");
    });

    it("should call getLanguage()", () => {
      component.ngOnInit();
      expect(getLanguageSpy).toHaveBeenCalled();
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

  describe("getLanguage()", () => {
    let getSpy: jasmine.Spy;
    let fillFormSpy: jasmine.Spy;
    let errorSpy: jasmine.Spy;
    const lang: Language = {} as Language;

    beforeEach(() => {
      // @ts-expect-error - mocking private parameter
      getSpy = spyOn(component.route.snapshot.paramMap, "get").and.returnValue("1");
      fillFormSpy = spyOn(component, "fillForm");
      errorSpy = spyOn(console, "error");
      mockLanguageService.getLanguage.and.returnValue(of(lang));
    });

    it("should call route.snapshot.paramMap.get()", () => {
      component.getLanguage();
      expect(getSpy).toHaveBeenCalledWith("_id");
    });

    it("should call languageService.getLanguage() with id", () => {
      component.getLanguage();
      expect(mockLanguageService.getLanguage).toHaveBeenCalledWith("1");
    });

    it("should set language", () => {
      component.getLanguage();
      expect(component.language).toBe(lang);
    });

    it("should call fillForm()", () => {
      component.getLanguage();
      expect(fillFormSpy).toHaveBeenCalled();
    });

    it("should set loading to false", () => {
      component.getLanguage();
      expect(component.loading).toBeFalse();
    });

    it("should call console.error() on error", () => {
      mockLanguageService.getLanguage.and.returnValue(throwError(() => "error"));
      component.getLanguage();
      expect(errorSpy).toHaveBeenCalledWith("error");
    });
  });

  describe("fillForm()", () => {
    let groupSpy: jasmine.Spy;
    let lang: Language;

    beforeEach(() => {
      // @ts-expect-error // formBuilder is private
      groupSpy = spyOn(component.formBuilder, "group").and.callThrough();
      lang = { creators: ["creator"], extensions: ["extension"]} as Language;
      component.language = lang;
    });

    it("should fill creators with language creators", () => {
      component.form = formGroup;
      component.fillForm();
      expect(component.creators.length).toBe(1);
      expect(component.creators.at(0).value).toBe("creator");
      expect(component.creators.at(0).hasValidator(Validators.required)).toBeTrue();
    });

    it("should fill extensions with language extensions", () => {
      component.form = formGroup;
      component.fillForm();
      expect(component.extensions.length).toBe(1);
      expect(component.extensions.at(0).value).toBe("extension");
      expect(component.extensions.at(0).hasValidator(Validators.required)).toBeTrue();
      expect(component.extensions?.at(0)?.errors).toEqual({
        pattern: {
          requiredPattern: `${globals.constants.EXTENSION_REGEX}`,
          actualValue: "extension"
        }
      });
    });

    it("should call formBuilder.group()", () => {
      component.fillForm();
      expect(groupSpy).toHaveBeenCalled();
    });

    it("should fill form with language", () => {
      lang = {
        name: "TypeScript",
        creators: [
          "Anders Hejlsberg"
        ],
        extensions: [
          ".ts",
          ".tsx",
          ".mts",
          ".cts"
        ],
        firstAppeared: new Date("2012-10-01T00:00:00Z"),
        year: 2012,
        wiki: "https://en.wikipedia.org/wiki/TypeScript"
      };
      component.language = lang;
      component.fillForm();

      expect(component.form.get("name")?.value).toBe(lang.name);
      expect(component.form.get("creators")?.value).toEqual(lang.creators);
      expect(component.form.get("extensions")?.value).toEqual(lang.extensions);
      expect(component.form.get("firstAppeared")?.value).toEqual(lang.firstAppeared as Date);
      expect(component.form.get("year")?.value).toBe(lang.year);
      expect(component.form.get("wiki")?.value).toBe(lang.wiki);
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
      const currentDate: Date = new Date();
      component.form = formGroup;
      component.form.get("name")?.setValue("name");
      component.form.get("creators")?.setValue(["creator"]);
      component.form.get("extensions")?.setValue(["extension"]);
      component.form.get("firstAppeared")?.setValue(currentDate);
      component.form.get("year")?.setValue(1900);
      component.form.get("wiki")?.setValue("wiki");
      component.language = { _id: "1" } as Language;

      const expected: Language = {
        _id: "1",
        name: "name",
        creators: ["creator"],
        extensions: ["extension"],
        firstAppeared: currentDate,
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
      mockLanguageService.upsertLanguage.and.returnValue(of(null));
    });

    it("should call getLanguageFromForm()", () => {
      component.onSubmit();
      expect(getLanguageFromFormSpy).toHaveBeenCalled();
    });

    it("should call languageService.upsertLanguage()", () => {
      component.onSubmit();
      expect(mockLanguageService.upsertLanguage).toHaveBeenCalledWith(lang);
    });

    it("should call router.navigate() on success", () => {
      component.onSubmit();
      expect(navigateSpy).toHaveBeenCalledWith(["/"]);
    });

    it("should call console.error() on error", () => {
      mockLanguageService.upsertLanguage.and.returnValue(throwError(() => "error"));
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
