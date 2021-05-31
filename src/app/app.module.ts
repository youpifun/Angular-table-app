import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent }   from "./app.component";
import { Table } from "./table/table"
import { Modal } from "./modal/modal";
import { Search } from "./search/search"
@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, Table, Modal, Search ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }