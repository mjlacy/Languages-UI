import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { LanguageListComponent } from "./language-list.component";
import { LanguageService } from "@services/language.service";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { Language, Languages } from "@models/language.model";
import { of, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DeleteLanguageComponent } from "../delete-language/delete-language.component";
import { MatTableDataSource } from "@angular/material/table";

describe("LanguageListComponent", () => {
  let component: LanguageListComponent;
  let fixture: ComponentFixture<LanguageListComponent>;
  const mockLanguageService = jasmine.createSpyObj("LanguageService", ["getLanguages", "deleteLanguage"]);
  const mockMatDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageListComponent],
      imports: [
        MatPaginatorModule
      ],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageListComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    let getLanguagesSpy: jasmine.Spy;

    beforeEach(() => {
      getLanguagesSpy = spyOn(component, "getLanguages");
    });

    it("should call getLanguages()", () => {
      component.ngOnInit();
      expect(getLanguagesSpy).toHaveBeenCalled();
    });
  });

  describe("ngAfterViewInit()", () => {
    it("should set dataSource.paginator", () => {
      component.ngAfterViewInit();
      expect(component.dataSource.paginator).toBe(component.paginator as MatPaginator);
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

  describe("getLanguages()", () => {
    let errorSpy: jasmine.Spy;
    const langs: Languages = {languages: []};

    beforeEach(() => {
      mockLanguageService.getLanguages.and.returnValue(of(langs));
      errorSpy = spyOn(console, "error");
    });

    it("should call languageService.getLanguages()", () => {
      component.getLanguages();
      expect(mockLanguageService.getLanguages).toHaveBeenCalled();
    });

    it("should set dataSource.data", () => {
      component.getLanguages();
      expect(component.dataSource.data).toBe(langs.languages);
    });

    it("should call console.error()", () => {
      mockLanguageService.getLanguages.and.returnValue(throwError(() => "error"));
      component.getLanguages();
      expect(errorSpy).toHaveBeenCalledWith("error");
    });
  });

  describe("openDialog()", () => {
    let errorSpy: jasmine.Spy;
    const lang: Language = { _id: "1" } as Language;

    beforeEach(() => {
      errorSpy = spyOn(console, "error");
      mockLanguageService.deleteLanguage.calls.reset();
      mockLanguageService.deleteLanguage.and.returnValue(of(null));
      component.dataSource = {
        data: [lang]
      } as unknown as MatTableDataSource<Language, MatPaginator>;
      mockMatDialog.open.and.returnValue({ afterClosed: () => of(true) });
    });

    it("should call dialog.open()", () => {
      component.openDialog(lang);
      // @ts-expect-error // dialog is private
      expect(component.dialog.open).toHaveBeenCalledWith(DeleteLanguageComponent, {
        data: {
          languageName: lang.name
        },
        disableClose: true
      });
    });

    it("should do nothing if filter fails", () => {
      mockMatDialog.open.and.returnValue({ afterClosed: () => of(false) });
      component.openDialog(lang);
      expect(mockLanguageService.deleteLanguage).not.toHaveBeenCalled();
    });

    it("should call languageService.deleteLanguage()", () => {
      component.openDialog(lang);
      expect(mockLanguageService.deleteLanguage).toHaveBeenCalledWith(lang._id);
    });

    it("should remove deleted language from dataSource.data", () => {
      component.openDialog(lang);
      expect(component.dataSource.data).toEqual([]);
    });

    it("should set dataSource.paginator", () => {
      component.dataSource = {
        data: [lang],
        paginator: undefined
      } as unknown as MatTableDataSource<Language, MatPaginator>;
      component.openDialog(lang);
      expect(component.dataSource.paginator).toBe(component.paginator as MatPaginator);
    });

    it("should call console.error()", () => {
      mockLanguageService.deleteLanguage.and.returnValue(throwError(() => "error"));
      component.openDialog(lang);
      expect(errorSpy).toHaveBeenCalledWith("error");
    });
  });
});
