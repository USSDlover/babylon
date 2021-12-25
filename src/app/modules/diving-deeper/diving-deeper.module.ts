import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DivingDeeperRouteComponents, DivingDeeperRoutingModule} from './diving-deeper-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

const AngularMaterials = [
  MatButtonModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    ...DivingDeeperRouteComponents
  ],
  imports: [
    CommonModule,
    DivingDeeperRoutingModule,
    ...AngularMaterials
  ]
})
export class DivingDeeperModule { }
