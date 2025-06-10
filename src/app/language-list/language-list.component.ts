import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Language, Languages } from "@models/language.model";
import { LanguageService } from "@services/language.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { filter, switchMap } from "rxjs/operators";
import { DeleteLanguageComponent } from "../delete-language/delete-language.component";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: "app-language-list",
    templateUrl: "./language-list.component.html",
    styleUrl: "./language-list.component.scss",
    standalone: false
})
export class LanguageListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ["name", "creators", "extensions", "firstAppeared", "year", "wiki", "edit", "delete"];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource<Language>();
  destroy$: Subject<void> = new Subject<void>();

  private languageService: LanguageService = inject(LanguageService);
  private dialog: MatDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.getLanguages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  getLanguages(): void {
    this.languageService.getLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (languages: Languages) => {
          this.dataSource.data = languages.languages;
      },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
    });
  }

  openDialog(language: Language): void {
    const dialogRef: MatDialogRef<DeleteLanguageComponent> = this.dialog.open(DeleteLanguageComponent, {
      data: {
        languageName: language.name
      },
      disableClose: true
    });

    dialogRef
    .afterClosed()
    .pipe(
      takeUntil(this.destroy$),
      filter((confirmDelete: boolean) => confirmDelete),
      switchMap((_: boolean) => this.languageService.deleteLanguage(language._id as string))
    ).subscribe({
      next: (_: null) => {
        this.dataSource.data.splice(this.dataSource.data.indexOf(language), 1);
        this.dataSource.paginator = this.paginator as MatPaginator;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
