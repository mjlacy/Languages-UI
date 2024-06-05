import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Language, Languages } from '../shared/models/language.model';
import { LanguageService } from '../services/language.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'creators', 'extensions', 'firstAppeared', 'year', 'wiki', 'edit', 'delete'];
  dataSource: MatTableDataSource<Language> = new MatTableDataSource<Language>([]);

  constructor(private languageService: LanguageService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.getLanguages();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  getLanguages(): void {
    this.languageService.getLanguages()
      .pipe(
        map((languages: Languages) => languages?.languages)
      ) 
      .subscribe({
        next: (languages: Language[]) => {
          this.dataSource.data = languages;
      },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
    });
  }
}
