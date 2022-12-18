import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonListComponent } from './person-list';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const routes: Routes = [
  { path: 'list',  component: PersonListComponent },
  { path: 'GetOne/:id', component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
