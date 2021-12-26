import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnimationComponent} from './animation/animation.component';
import {CartoonRoomComponent} from './cartoon-room/cartoon-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'animation', pathMatch: 'full' },
  {
    path: 'animation',
    component: AnimationComponent
  },
  {
    path: 'cartoon',
    component: CartoonRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivingDeeperRoutingModule { }

export const DivingDeeperRouteComponents = [
  AnimationComponent,
  CartoonRoomComponent
];
