import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarPage } from './administrar.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdministrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class AdministrarPageRoutingModule {}
