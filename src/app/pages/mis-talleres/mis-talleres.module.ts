import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisTalleresPageRoutingModule } from './mis-talleres-routing.module';

import { MisTalleresPage } from './mis-talleres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisTalleresPageRoutingModule
  ],
  declarations: [MisTalleresPage]
})
export class MisTalleresPageModule {}
