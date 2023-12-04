import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OsobaFormComponent } from './components/osoba-form/osoba-form.component';
import { TabelaDanychComponent } from './components/tabela-danych/tabela-danych.component';
import { StrukturaFormComponent } from './components/struktura-form/struktura-form.component';
import { ZarzadzanieProjektamiComponent } from './components/zarzadzanie-projektami/zarzadzanie-projektami.component';

const routes: Routes = [
  {path: 'osoby', component: OsobaFormComponent },
  {path: 'zestawienie', component: TabelaDanychComponent},
  {path: 'struktura', component: StrukturaFormComponent},
  {path: 'projekty', component: ZarzadzanieProjektamiComponent},
  //{ path: ‘’, redirectTo: ‘/one’, pathMatch: ‘full’ },
  //{ path: ‘**’, component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    //,{enableTracing: true}) ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
