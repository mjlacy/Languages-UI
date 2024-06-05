import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageListComponent } from './language-list/language-list.component';

const routes: Routes = [
  {
    path: '',
    component: LanguageListComponent,
  },
  // {
  //   path: 'addBook',
  //   component: AddBookComponent,
  // },
  // {
  //   path: 'editBook/:_id',
  //   component: EditBookComponent,
  // },
  // {
  //   path: 'deleteBook/:_id',
  //   component: DeleteBookComponent,
  // },
  { path: '**', component: LanguageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
