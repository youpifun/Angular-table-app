import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "active-filters-list",
    templateUrl: "./filters.html",
    styleUrls: ["./filters.scss"]
})

export class Filters {
    @Input() activeFilters;
    @Output() clickedOnRemoveIcon = new EventEmitter<string>();
    
    handleRemoveFilter(filterKey: string){
        this.clickedOnRemoveIcon.emit(filterKey);
    }
}