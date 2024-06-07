import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageListComponent } from './language-list/language-list.component';
import { AddLanguageComponent } from './add-language/add-language.component';
// import { EditLanguageComponent } from './edit-language/edit-language.component';
// import { DeleteLanguageComponent } from './delete-language/delete-language.component';

const routes: Routes = [
  {
    path: '',
    component: LanguageListComponent,
  },
  {
    path: 'add',
    component: AddLanguageComponent,
  },
  // {
  //   path: 'edit/:_id',
  //   component: EditLanguageComponent,
  // },
  // {
  //   path: 'delete',
  //   component: DeleteLanguageComponent,
  // },
  { path: '**', component: LanguageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
