import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FiltersData } from "../data.service";

@Component({
    selector: "active-filters-list",
    templateUrl: "./filters.html",
    styleUrls: ["./filters.scss"]
})

export class Filters {
    @Input() filters: FiltersData;
    @Output() onRemoveIconClick = new EventEmitter<boolean>();

    handleRemoveFilter(filterKey: string){
        this.filters.delete(filterKey);
        this.onRemoveIconClick.emit();
    }
}