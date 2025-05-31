import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { first } from "rxjs/operators";
import { Language, Languages } from "../shared/models/language.model";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable()
export class LanguageService {
  public readonly LANGUAGE_API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getLanguages(lang?: Language): Observable<Languages> {
    let queryString: string = "?" + (!!lang?.name ? `name=${lang.name}&` : "") + (!!lang?.creators?.length ? `creators=${lang?.creators.toString()}&` : "") +
      (!!lang?.extensions?.length ? `extensions=${lang?.extensions.toString()}&` : "") + (!!lang?.firstAppeared ? `firstAppeared=${lang?.firstAppeared.toISOString()}&` : "") +
      (!!lang?.year ? `year=${lang?.year}&` : "") + (!!lang?.wiki ? `wiki=${lang?.wiki}&` : "");

    if (queryString === "?") {
      queryString = "";
    } else if (queryString.endsWith("&")) {
      queryString = queryString.slice(0, -1);
    }

    return this.httpClient.get<Languages>(`${this.LANGUAGE_API_URL}${queryString}`).pipe(first());
  }

  getLanguage(id: string): Observable<Language> {
    return this.httpClient.get<Language>(`${this.LANGUAGE_API_URL}${id}`).pipe(first());
  }

  addLanguage(language: Language): Observable<null> {
    return this.httpClient.post<null>(this.LANGUAGE_API_URL, language, httpOptions).pipe(first());
  }

  upsertLanguage(language: Language): Observable<null> {
    return this.httpClient.put<null>(`${this.LANGUAGE_API_URL}${language._id}`, language, httpOptions).pipe(first());
  }

  updateLanguage(language: Language): Observable<null> {
    return this.httpClient.patch<null>(`${this.LANGUAGE_API_URL}${language._id}`, language, httpOptions).pipe(first());
  }

  deleteLanguage(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.LANGUAGE_API_URL}${id}`).pipe(first());
  }
}
