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
    @Output() filterChanged = new EventEmitter<any>();

    isNameFilterActive: boolean = false;
    isCityFilterActive: boolean = false;
    isTitleFilterActive: boolean = false;

    handleHeaderClick($event: MouseEvent) {
        let target = $event.target as Element;
        if (target.id == "sort-icon") {
            target = target.parentElement;
        }
        if (target.classList.contains("filterIcon")) {
            let filterId = target.parentElement.id;
            this.togglePopup(filterId);
            return;
        }
        this.headerClicked.emit(target);
    }

    handleRowClick(index: number) {
        this.rowClicked.emit(index);
    }

    togglePopup(popupToToggle: string) {
        switch (popupToToggle) {
            case "name":
                this.isNameFilterActive = !this.isNameFilterActive;
                break;
            case "city":
                this.isCityFilterActive = !this.isCityFilterActive;
                break;
            case "title":
                this.isTitleFilterActive = !this.isTitleFilterActive;
                break;
            default:
                break;
        }
    }

    handleFilterChange(filterData: {value:string, filterType:string}) {
        this.filterChanged.emit(filterData);
    }
} 