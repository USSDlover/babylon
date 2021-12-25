import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CubeComponent} from './cube/cube.component';
import {SphereComponent} from './sphere/sphere.component';

const routes: Routes = [
  { path: '', redirectTo: 'cube', pathMatch: 'full' },
  {
    path: 'cube',
    component: CubeComponent
  },
  {
    path: 'sphere',
    component: SphereComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GettingStartedRoutingModule { }

export const GettingStartedRouteComponents = [
  CubeComponent,
  SphereComponent
]
