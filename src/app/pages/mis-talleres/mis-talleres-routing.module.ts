import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisTalleresPage } from './mis-talleres.page';

const routes: Routes = [
  {
    path: '',
    component: MisTalleresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisTalleresPageRoutingModule {}
