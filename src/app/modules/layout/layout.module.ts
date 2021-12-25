import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { LayoutComponent } from './layout/layout.component';

const AngularMaterial = [
  MatButtonModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    NavigationComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ...AngularMaterial
  ],
  exports: [
    NavigationComponent,
    LayoutComponent
  ]
})
export class LayoutModule { }
