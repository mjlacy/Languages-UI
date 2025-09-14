import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Language, LanguagesResp } from '../shared/models/language.model';
import { LanguageService } from '../services/language.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, catchError, filter, map, of, startWith, switchMap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteLanguageComponent } from '../delete-language/delete-language.component';

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrl: './language-list.component.scss',
    standalone: false
})
export class LanguageListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'creators', 'extensions', 'firstAppeared', 'year', 'wiki', 'edit', 'delete'];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource<Language>();
  total: number = 0;

  constructor(private languageService: LanguageService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit(): void {
    const paginator = this.paginator as MatPaginator

    this.dataSource.paginator = paginator;

    paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getLanguages(
            paginator.pageSize,
            paginator.pageIndex + 1
          ).pipe(
            catchError(() => of(null))
          );
        }),
        map((languages: LanguagesResp | null) => {
          if (languages == null) {
            return [];
          }
          this.total = languages.total;
          return languages.languages;
        })
      )
      .subscribe((languages: Language[]) => {
        this.dataSource = new MatTableDataSource(languages);
      });
  }

  getLanguages(size: number = 5, page: number = 1): Observable<LanguagesResp> {
    return this.languageService.getLanguages({size, page});
  }

  openDialog(language: Language): void {
    const dialogRef: MatDialogRef<DeleteLanguageComponent> = this.dialog.open(DeleteLanguageComponent, {
      data: {
        language: language
      },
    });

    dialogRef
    .afterClosed()
    .pipe(
      filter((confirmDelete: boolean) => confirmDelete),
      switchMap((_: boolean) => {
        return this.languageService.deleteLanguage(language._id as string);
      })
    ).subscribe({
      next: () => {
        const paginator: MatPaginator = this.paginator as MatPaginator;

        if ((paginator.pageSize * paginator.pageIndex) === (paginator.length - 1)) {
          paginator.pageIndex -= 1;
        }

        paginator.page.next({
          pageIndex: paginator.pageIndex,
          pageSize: paginator.pageSize,
          length: paginator.length
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
