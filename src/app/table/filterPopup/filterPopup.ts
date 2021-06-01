import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FilterData } from "../../data.service";

@Component({
    selector: "filter-popup",
    templateUrl: "./filterPopup.html",
    styleUrls: ["./filterPopup.scss"]
})

export class FilterPopup {
    @Input() fieldToFilter:string;
    @Input() filterValue: string;
    @Output() onFilterChange = new EventEmitter<FilterData>();
    @Output() onPopupClose = new EventEmitter<string>();

    lastCallTimer = null;

    filterInputChange($event: InputEvent) {
        this.filterValue = ($event.target as HTMLInputElement).value;
        let filterData = {value: this.filterValue, fieldToFilter: this.fieldToFilter};
        clearTimeout(this.lastCallTimer);
        this.lastCallTimer = setTimeout(() => this.onFilterChange.emit(filterData), 500);
    }

    closePopupBtnClick($event: MouseEvent) {
        $event.stopPropagation();
        this.onPopupClose.emit(this.fieldToFilter);
    };

    clearFilterBtnClick() {
        this.filterValue = "";
        let filterData = {value: this.filterValue, fieldToFilter: this.fieldToFilter};
        this.onFilterChange.emit(filterData);
    }
}