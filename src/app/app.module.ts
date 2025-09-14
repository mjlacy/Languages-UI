import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from './services/language.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { EmptyPipe } from "./shared/pipes/empty.pipe";
import { ParseArrayPipe } from "./shared/pipes/parse-array.pipe";
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgVarDirective } from './shared/directives/ngVar/ngVar-directive';
import { DigitOnlyDirective } from './shared/directives/digit-only/digit-only-directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteLanguageComponent } from './delete-language/delete-language.component';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmptyPipe,
    ParseArrayPipe,
    LanguageListComponent,
    AddLanguageComponent,
    DigitOnlyDirective,
    NgVarDirective,
    EditLanguageComponent,
    DeleteLanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideNativeDateAdapter(),
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
