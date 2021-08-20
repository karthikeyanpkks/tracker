import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  { path: 'issues', component: IssuesComponent },
  { path: '', pathMatch: 'full', redirectTo: '/issues' },
  { path: '**', redirectTo: '/issues' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
