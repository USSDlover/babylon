import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GettingStartedRouteComponents, GettingStartedRoutingModule} from './getting-started-routing.module';


@NgModule({
  declarations: [
    ...GettingStartedRouteComponents
  ],
  imports: [
    CommonModule,
    GettingStartedRoutingModule
  ]
})
export class GettingStartedModule { }
