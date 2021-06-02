import { Component } from "@angular/core";
import { DataService, Post, FiltersData, FilterData } from "./data.service";
import { filterData } from "./utils";

@Component({
    selector: "table-app",
    template: `<modal-window
                    *ngIf="isModalActive"
                    [curPost]="curPost"
                    (closeModal)="toggleModal()"
                ></modal-window>
                <search
                    (onQueryInput)="handleSearchData($event)"
                ></search>
                <active-filters-list
                    *ngIf="activeFilters.size != 0"
                    [filters]="activeFilters"
                    (onRemoveIconClick)="applyFilters()"
                ></active-filters-list>
                <info-table
                    [posts]="filteredPosts"
                    [filters]="activeFilters"
                    (onRowClick)="toggleModal($event)"
                    (onFilterChange)="applyFilters()"
                ></info-table>`,
    providers: [DataService]
})

export class AppComponent { 
    posts: Array<Post> = [];
    filteredPosts: Array<Post> = [];
    activeFilters: FiltersData = new Map();
    filterOnSearchResult: boolean = false;
    searchQuery: string = "";
    isModalActive: boolean = false;
    curPost: Post;

    searchFields: Array<string> = ["authorName", "authorCity", "title", "commentsAmount"];

    constructor(private dataService : DataService){}

    ngOnInit() {
        (async () => {
            let res: Array<Post> = await this.dataService.getUsersData();
            Promise.all(res).then(res=>{
                this.posts = res;
                this.filteredPosts = res;
            });
        })();
    }
    
    toggleModal(index: number) {
        this.isModalActive = !this.isModalActive;
        if (this.isModalActive) {
            this.curPost = this.filteredPosts[index];
        }
    }

    handleSearchData(searchQuery: string) {
        this.searchQuery = searchQuery;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredPosts = this.posts;
        if (this.searchQuery.length > 0)
            this.filteredPosts = filterData(this.posts, this.searchQuery, this.searchFields);
        for (const filter of this.activeFilters.entries()) {
            this.filteredPosts = filterData(this.filteredPosts, filter[1], [filter[0]])
        }
    }
}