import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'started', pathMatch: 'full' },
  {
    path: 'started',
    loadChildren: () =>
      import('./modules/getting-started/getting-started.module')
        .then(m => m.GettingStartedModule)
  },
  {
    path: 'diving',
    loadChildren: () =>
      import('./modules/diving-deeper/diving-deeper.module')
        .then(m => m.DivingDeeperModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
