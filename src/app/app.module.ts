import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Table } from './table/table'
@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, Table ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }