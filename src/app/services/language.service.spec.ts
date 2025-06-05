import { HttpTestingController, provideHttpClientTesting, TestRequest } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LanguageService } from "./language.service";
import { environment } from "@environments/environment";
import { Language, Languages } from "@models/language.model";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("LanguageService", () => {
  let httpTestingController: HttpTestingController;
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  describe("getLanguages()", () => {
    it("should make HTTP GET request", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      service.getLanguages().subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(environment.apiUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with name in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      service.getLanguages({name: "TypeScript"} as Language).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?name=TypeScript`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with creators in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = { creators: ["Anders Hejlsberg"] } as Language;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?creators=Anders Hejlsberg`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with extensions in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = { extensions: [".ts", ".tsx", ".mts", ".cts"] } as Language;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?extensions=.ts,.tsx,.mts,.cts`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with firstAppeared in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = { firstAppeared: new Date("2012-10-01T00:00:00.000Z") } as Language;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?firstAppeared=2012-10-01T00:00:00.000Z`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with year in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = { year: 2012 } as Language;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?year=2012`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with wiki in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = { wiki: "https://en.wikipedia.org/wiki/TypeScript" } as Language;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?wiki=https://en.wikipedia.org/wiki/TypeScript`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });

    it("should make HTTP GET request with multiple parameters in query string", (done: DoneFn) => {
      const languages: Languages = { languages: [ {} as Language ] };
      const lang: Language = {
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
        firstAppeared: new Date("2012-10-01T00:00:00.000Z"),
        "year": 2012,
        "wiki": "https://en.wikipedia.org/wiki/TypeScript"
      } ;
      service.getLanguages(lang).subscribe({
        next: (langs: Languages) => {
          expect(langs).toBe(languages);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}?name=TypeScript&creators=Anders Hejlsberg&extensions=.ts,.tsx,.mts,.cts&firstAppeared=2012-10-01T00:00:00.000Z&year=2012&wiki=https://en.wikipedia.org/wiki/TypeScript`);
      expect(req.request.method).toEqual("GET");
      req.flush(languages);
    });
  });

  describe("getLanguages()", () => {
    it("should make HTTP GET request", (done: DoneFn) => {
      const language: Language = {} as Language;
      service.getLanguage("1").subscribe({
        next: (lang: Language) => {
          expect(lang).toBe(language);
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}1`);
      expect(req.request.method).toEqual("GET");
      req.flush(language);
    });
  });

  describe("addLanguage()", () => {
    it("should make HTTP POST request", (done: DoneFn) => {
      const language: Language = {} as Language;
      service.addLanguage(language).subscribe({
        next: (resp: null) => {
          expect(resp).toBeNull();
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(environment.apiUrl);
      expect(req.request.method).toEqual("POST");
      expect(req.request.body).toBe(language);
      req.flush(null);
    });
  });

  describe("upsertLanguage()", () => {
    it("should make HTTP PUT request", (done: DoneFn) => {
      const language: Language = {_id: "1"} as Language;
      service.upsertLanguage(language).subscribe({
        next: (resp: null) => {
          expect(resp).toBeNull();
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}1`);
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body).toBe(language);
      req.flush(null);
    });
  });

  describe("updateLanguage()", () => {
    it("should make HTTP PATCH request", (done: DoneFn) => {
      const language: Language = {_id: "1"} as Language;
      service.updateLanguage(language).subscribe({
        next: (resp: null) => {
          expect(resp).toBeNull();
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}1`);
      expect(req.request.method).toEqual("PATCH");
      expect(req.request.body).toBe(language);
      req.flush(null);
    });
  });

  describe("deleteLanguage()", () => {
    it("should make HTTP PATCH request", (done: DoneFn) => {
      service.deleteLanguage("1").subscribe({
        next: (resp: null) => {
          expect(resp).toBeNull();
          done();
        },
        error: (err) => {
          fail(err);
        }
      });

      const req: TestRequest = httpTestingController.expectOne(`${environment.apiUrl}1`);
      expect(req.request.method).toEqual("DELETE");
      req.flush(null);
    });
  });
});
