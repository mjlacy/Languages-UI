import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Language, Languages } from '../shared/models/language.model';
import { LanguageService } from '../services/language.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'creators', 'extensions', 'firstAppeared', 'year', 'wiki', 'edit', 'delete'];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource<Language>([]);

  constructor(private languageService: LanguageService) {}

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
      },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
    });
  }
}
