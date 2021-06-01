import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "filter-popup",
    templateUrl: "./filterPopup.html",
    styleUrls: ["./filterPopup.scss"]
})

export class FilterPopup {
    @Input() filterType:string;
    @Output() filterInputed = new EventEmitter<{value: string, filterType: string}>();
    @Output() closePopup = new EventEmitter<string>();

    lastCallTimer = null;
    filterValue: string = "";

    filterInputChange() {
        let filterData = {value: this.filterValue, filterType: this.filterType};
        clearTimeout(this.lastCallTimer);
        this.lastCallTimer = setTimeout(() => this.filterInputed.emit(filterData), 500);
    }

    closePopupBtnClick($event: MouseEvent) {
        $event.stopPropagation();
        this.closePopup.emit(this.filterType);
    };

    clearFilterBtnClick() {
        this.filterValue = "";
        let filterData = {value: this.filterValue, filterType: this.filterType};
        this.filterInputed.emit(filterData);
    }
}