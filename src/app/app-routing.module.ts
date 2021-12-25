import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'started', pathMatch: 'full' },
  {
    path: 'started',
    loadChildren: () =>
      import('./modules/getting-started/getting-started.module')
        .then(m => m.GettingStartedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
