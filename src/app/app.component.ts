import { Component } from "@angular/core";
import { DataService, UsersData, ModalData } from "./data.service";
import { sortColumn, reverseColumn, filterData, removeSortsFromTableHeaders, addIconToTableHeader } from "./utils";

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
    filterOnSearchResult: boolean = false;
    searchText: string = "";
    isModalActive: boolean = false;
    modalData: ModalData = {
        postTitle: "",
        commentsAmount: "",
        postText: "",
        comments: []
    };

    searchFields: Array<string> = ["name", "city", "title", "commentsAmount"];

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
    
    sortColumnHandler(target: HTMLTableHeaderCellElement) {
        if (target.classList.contains("sorted")) {
           document.getElementById("sort-icon").classList.toggle("rotated");
            this.realInfoList = reverseColumn(this.realInfoList);
            return;
        }
        removeSortsFromTableHeaders();
        addIconToTableHeader(target);
        this.realInfoList = sortColumn(this.realInfoList, target.id);
        target.classList.add("sorted");
    }

    toggleModal(index: number) {
        this.isModalActive = !this.isModalActive;
        if (this.isModalActive) {
            this.fillModalData(index);
            return;
        }
        this.modalData = {
            postTitle: "",
            commentsAmount: "",
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

    handleSearchData(searchText: string) {
        this.searchText = searchText;
        removeSortsFromTableHeaders();
        this.filterOnSearchResult = (searchText == "") ? false : true;
        this.applyFilters(this.allActiveFiltersData);
    }

    doSearch(searchText: string): UsersData {
        return filterData(this.fullInfoList, searchText, this.searchFields);
    }

    changeFiltersData(filter: {value: string, filterType: string}){
        if (filter.value == "") {
            this.removeFilterByKey(filter.filterType);
            return;
        }
        this.allActiveFiltersData.set(filter.filterType, filter.value);
        this.applyFilters(this.allActiveFiltersData);
    }
    
    removeFilterByKey(filterKey: string) {
        this.allActiveFiltersData.delete(filterKey);
        this.applyFilters(this.allActiveFiltersData);
    }

    applyFilters(filtersData) {
        removeSortsFromTableHeaders();
        this.realInfoList = (this.filterOnSearchResult) ? this.doSearch(this.searchText) : this.fullInfoList;
        for (const filter of filtersData.entries()) {
            this.realInfoList = filterData(this.realInfoList, filter[1], [filter[0]])
        }
    }
}