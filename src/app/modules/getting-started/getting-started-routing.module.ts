import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CubeComponent} from './cube/cube.component';

const routes: Routes = [
  {
    path: 'cube',
    component: CubeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GettingStartedRoutingModule { }

export const GettingStartedRouteComponents = [
  CubeComponent
]
