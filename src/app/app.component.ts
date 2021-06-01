import { Component } from "@angular/core";
import { DataService, UsersData, ModalData } from "./data.service";
import { sortColumn, reverseColumn, filterData, removeSortsFromTableHeaders } from "./utils";

@Component({
    selector: "table-app",
    template: `<modal-window 
                    *ngIf="isModalActive"
                    [modalData]="modalData"
                    (closeModal)="toggleModal()"
                ></modal-window>
                <search
                    (filterStringInputed)="handleSearchData($event)"
                ></search>
                <active-filters-list 
                    [activeFilters]="allActiveFiltersData"
                    (clickedOnRemoveIcon)="removeFilterByKey($event)"
                ></active-filters-list>
                <info-table 
                    [infoList]="realInfoList" 
                    (headerClicked)="sortColumnHandler($event)" 
                    (rowClicked)="toggleModal($event)"
                    (filterChanged)="changeFiltersData($event)"
                ></info-table>`,
    providers: [DataService]
})
export class AppComponent { 
    fullInfoList: UsersData = [];
    realInfoList: UsersData = [];
    allActiveFiltersData = new Map();
    isModalActive: boolean = false;
    modalData: ModalData = {
        postTitle: "",
        commentsAmount: 0,
        postText: "",
        comments: []
    };

    constructor(private dataService : DataService){}

    ngOnInit() {
        (async () => {
            let res = await this.dataService.getUsersData();
            Promise.all(res).then(res=>{
                this.fullInfoList = res;
                this.realInfoList = res;
            });
        })();
    }
    
    sortColumnHandler(target: Element) {
        if (target.classList.contains("sorted")) {
           document.getElementById("sort-icon").classList.toggle("rotated");
            this.realInfoList = reverseColumn(this.realInfoList);
            return;
        }
        removeSortsFromTableHeaders();
        this.addIconToColumn(target);
        this.realInfoList = sortColumn(this.realInfoList, target.id);
        target.classList.add("sorted");
    }

    addIconToColumn(columnHeaderCell: Element) {
        let sortIcon = document.createElement("img");
        sortIcon.src = "assets/arrow.svg"
        sortIcon.id = "sort-icon";
        columnHeaderCell.appendChild(sortIcon);
    }

    toggleModal(index: number) {
        this.isModalActive = !this.isModalActive;
        if (this.isModalActive) {
            this.fillModalData(index);
            return;
        }
        this.modalData = {
            postTitle: "",
            commentsAmount: 0,
            postText: "",
            comments: []
        };
        return;
    }

    fillModalData(index: number) {
        let modalData = this.modalData;
        let currentRow = this.realInfoList[index];
        modalData.postTitle = currentRow.title;
        modalData.commentsAmount = currentRow.commentsAmount;
        modalData.postText = currentRow.text;
        this.dataService.getPostComments(currentRow.id)
        .then(res => modalData.comments = res);
    }

    handleSearchData(filterText: string) {
        removeSortsFromTableHeaders();
        this.realInfoList = filterData(this.fullInfoList, filterText, "title");
    }

    changeFiltersData(filterData: {value: string, filterType: string}){
        if (filterData.value == "") {
            this.removeFilterByKey(filterData.filterType);
            return;
        }
        this.allActiveFiltersData.set(filterData.filterType, filterData.value);
        this.applyFilters(this.allActiveFiltersData);
    }
    
    removeFilterByKey(filterKey: string) {
        this.allActiveFiltersData.delete(filterKey);
        this.applyFilters(this.allActiveFiltersData);
    }

    applyFilters(filtersData) {
        removeSortsFromTableHeaders();
        this.realInfoList = this.fullInfoList;
        for (const filter of filtersData.entries()) {
            this.realInfoList = filterData(this.realInfoList, filter[1], filter[0])
        }
    }
}