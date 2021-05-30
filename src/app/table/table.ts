import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UsersData } from "../data.service";


@Component({
    selector: "info-table",
    templateUrl: "./table.html",
    styleUrls: ["./table.scss"]
})

export class Table {
    @Input() infoList: UsersData;
    @Output() headerClicked = new EventEmitter<MouseEvent>();
    @Output() rowClicked = new EventEmitter<number>();

    handleHeaderClick($event: MouseEvent) {
        this.headerClicked.emit($event);
    }

    handleRowClick(index: number) {
        this.rowClicked.emit(index);
    }
} 