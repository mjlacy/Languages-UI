import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/operators';
import { Language, LanguagesResp } from '../shared/models/language.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LanguageService {
  public readonly LANGUAGE_API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllLanguages({name = '', creators = [], extensions = [], firstAppeared = '', year = 0, wiki= ''} = {}): Observable<LanguagesResp> {
    const queryString = '?' + (!!name ? `name=${name}&` : '') + (!!creators.length ? `creators=${creators.toString()}&` : '') +
      (!!extensions.length ? `extensions=${extensions.toString()}&` : '') + (!!firstAppeared ? `firstAppeared=${firstAppeared}&` : '') +
      (!!year ? `year=${year}&` : '') + (!!wiki ? `wiki=${wiki}&` : '') + 'size=-1';

    return this.httpClient.get<LanguagesResp>(`${this.LANGUAGE_API_URL}${queryString}`).pipe(first());
  }

  getLanguages({name = '', creators = [], extensions = [], firstAppeared = '', year = 0, wiki= '', page = 1, size = 10} = {}): Observable<LanguagesResp> {
    const queryString = '?' + (!!name ? `name=${name}&` : '') + (!!creators.length ? `creators=${creators.toString()}&` : '') +
      (!!extensions.length ? `extensions=${extensions.toString()}&` : '') + (!!firstAppeared ? `firstAppeared=${firstAppeared}&` : '') +
      (!!year ? `year=${year}&` : '') + (!!wiki ? `wiki=${wiki}&` : '') + `page=${page}&` + `size=${size}`;

    return this.httpClient.get<LanguagesResp>(`${this.LANGUAGE_API_URL}${queryString}`).pipe(first());
  }

  getLanguage(id: string): Observable<Language> {
    return this.httpClient.get<Language>(`${this.LANGUAGE_API_URL}${id}`).pipe(first());
  }

  addLanguage(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(this.LANGUAGE_API_URL, language, httpOptions).pipe(first());
  }

  upsertLanguage(language: Language): Observable<Language> {
    const id: string = language._id as string;
    delete language._id;
    return this.httpClient.put<Language>(`${this.LANGUAGE_API_URL}${id}`, language, httpOptions).pipe(first());
  }

  updateLanguage(language: Language): Observable<Language> {
    return this.httpClient.patch<Language>(`${this.LANGUAGE_API_URL}${language._id}`, language, httpOptions).pipe(first());
  }

  deleteLanguage(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.LANGUAGE_API_URL}${id}`).pipe(first());
  }
}
