import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnimationComponent} from './animation/animation.component';

const routes: Routes = [
  { path: '', redirectTo: 'animation', pathMatch: 'full' },
  {
    path: 'animation',
    component: AnimationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivingDeeperRoutingModule { }

export const DivingDeeperRouteComponents = [
  AnimationComponent
];
