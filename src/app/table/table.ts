import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UsersData } from "../data.service";


@Component({
    selector: "info-table",
    templateUrl: "./table.html",
    styleUrls: ["./table.scss"]
})

export class Table {
    @Input() infoList: UsersData;
    @Output() headerClicked = new EventEmitter<Element>();
    @Output() rowClicked = new EventEmitter<number>();

    handleHeaderClick($event: MouseEvent) {
        let target = $event.target as Element;
        if (target.id == "sort-icon") {
            target = target.parentElement;
        }
        this.headerClicked.emit(target);
    }

    handleRowClick(index: number) {
        this.rowClicked.emit(index);
    }
} 