import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OsobaFormComponent } from './components/osoba-form/osoba-form.component';
import { TabelaDanychComponent } from './components/tabela-danych/tabela-danych.component';

const routes: Routes = [
  { path: 'osoby', component: OsobaFormComponent },
  {path: 'zestawienie', component: TabelaDanychComponent}
  //{ path: ‘’, redirectTo: ‘/one’, pathMatch: ‘full’ },
  //{ path: ‘**’, component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    //,{enableTracing: true}) ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
