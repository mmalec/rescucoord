import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
// inne potrzebne moduły PrimeNG
import { ButtonModule } from 'primeng/button'; 
import { MessagesModule} from 'primeng/messages'
import {CardModule} from 'primeng/card'; 
import { InputTextModule } from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel'
import { SharedModule,  } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangesComponent } from './components/changes/changes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OsobaFormComponent } from './components/osoba-form/osoba-form.component';
import { StrukturaFormComponent } from './components/struktura-form/struktura-form.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    ChangesComponent,
    OsobaFormComponent,
    StrukturaFormComponent,
    MenubarComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    MessagesModule, 
    CardModule,
    InputTextModule,
    PanelModule,
    SharedModule, 
    TreeTableModule,
    MenubarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
