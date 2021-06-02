import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post, FilterData, FiltersData } from "../data.service";
import { sortColumn } from "../utils";

@Component({
    selector: "info-table",
    templateUrl: "./table.html",
    styleUrls: ["./table.scss"]
})

export class Table {
    @Input() posts: Array<Post>;
    @Input() filters: FiltersData;
    @Output() onRowClick = new EventEmitter<number>();
    @Output() onFilterChange = new EventEmitter<FilterData>();

    ngOnChanges() {
        for (const column in this.columnsArray) {
            this.columnsArray[column].isSorted = false;
            this.columnsArray[column].isIconRotated = false;
        }
    }

    originalOrderComparator() { return 0; }

    columnsArray = {
        authorName: {
            filtrable: true,
            isFilterActive: false,
            columnText: "Имя пользователя",
            isSorted: false,
            isIconRotated: false
        },
    
        authorCity: {
            filtrable: true,
            isFilterActive: false,
            columnText: "Название города",
            isSorted: false,
            isIconRotated: false
        },
        title: {
            filtrable: true,
            isFilterActive: false,
            columnText: "Название публикации",
            isSorted: false,
            isIconRotated: false
        }, 
        commentsAmount: {
            filtrable: false,
            isFilterActive: false,
            columnText: "Количество комментариев",
            isSorted: false,
            isIconRotated: false
        }
    };

    handleHeaderClick($event: MouseEvent) {
        let columnId = ($event.target as HTMLElement).closest("th").id;
        if (this.columnsArray[columnId].isSorted) {
            this.columnsArray[columnId].isIconRotated = !this.columnsArray[columnId].isIconRotated;
            this.posts.reverse();
        } else {
            for (const column in this.columnsArray) {
                this.columnsArray[column].isSorted = false;
                this.columnsArray[column].isIconRotated = false;
            }
            this.posts = sortColumn(this.posts, columnId);
            this.columnsArray[columnId].isSorted = true;
        }
    }

    handleFilterIconClick($event: MouseEvent, filterId: string) {
        $event.stopImmediatePropagation();
        this.togglePopup(filterId);
    }

    handleRowClick(index: number) {
        this.onRowClick.emit(index);
    }

    togglePopup(popupToToggle: string) {
        this.columnsArray[popupToToggle].isFilterActive = !this.columnsArray[popupToToggle].isFilterActive;
    }

    handleFilterChange(filterData: FilterData) {
        this.onFilterChange.emit(filterData);
    }
} 