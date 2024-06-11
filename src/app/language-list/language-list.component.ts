import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Language, Languages } from '../shared/models/language.model';
import { LanguageService } from '../services/language.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeleteLanguageComponent } from '../delete-language/delete-language.component';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'creators', 'extensions', 'firstAppeared', 'year', 'wiki', 'edit', 'delete'];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource<Language>([]);
  loading: boolean = true;

  constructor(private languageService: LanguageService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator as MatPaginator;

    this.getLanguages();
  }

  getLanguages(): void {
    this.languageService.getLanguages()
      .subscribe({
        next: (languages: Languages) => {
          this.dataSource.data = languages.languages;
          this.loading = false;
      },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
    });
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
      switchMap((confirmDelete: boolean) => {
        if (confirmDelete) {
          return this.languageService.deleteLanguage(language._id as string);
        } else {
          return of(null);
        }
      }),
      tap(() => this.getLanguages()),
    ).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
}
