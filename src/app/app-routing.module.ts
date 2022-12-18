import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonListComponent } from './person-list';
import { PersonCreateComponent } from './person-create';
import { PersonDetailComponent } from './person-detail';

const routes: Routes = [
  { path: 'list',  component: PersonListComponent },
  { path: 'create',  component: PersonCreateComponent },
  { path: 'detail/:id', component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
