import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { AppComponent }   from "./app.component";
import { Table } from "./table/table"
import { Modal } from "./modal/modal";
import { Search } from "./search/search"
import { FilterPopup } from "./table/filterPopup/filterPopup";
import { Filters } from "./filters/filters";
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, Table, Modal, Search, FilterPopup, Filters ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }