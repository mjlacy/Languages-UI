import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from './services/language.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EmptyPipe } from "./shared/pipes/empty.pipe";
import { ParseArrayPipe } from "./shared/pipes/parse-array.pipe";
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmptyPipe,
    ParseArrayPipe,
    LanguageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
