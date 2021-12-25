import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DivingDeeperRouteComponents, DivingDeeperRoutingModule} from './diving-deeper-routing.module';


@NgModule({
  declarations: [
    ...DivingDeeperRouteComponents
  ],
  imports: [
    CommonModule,
    DivingDeeperRoutingModule
  ]
})
export class DivingDeeperModule { }
