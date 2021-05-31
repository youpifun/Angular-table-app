import { Component } from "@angular/core";
import { DataService, UsersData, ModalData } from "./data.service";
import { sortColumn, reverseColumn, filterData, removeSortsFromTableHeaders } from "./utils";

@Component({
    selector: "table-app",
    template: `<modal-window 
                    *ngIf="isModalActive"
                    [modalData]="modalData"
                    (modalClicked)="toggleModal()"
                ></modal-window>
                <search
                    (filterStringInputed)="handleFilterData($event)"
                ></search>
                <info-table 
                    [infoList]="realInfoList" 
                    (headerClicked)="sortColumnHandler($event)" 
                    (rowClicked)="toggleModal($event)"
                ></info-table>`,
    providers: [DataService]
})
export class AppComponent { 
    fullInfoList: UsersData = [];
    realInfoList: UsersData = [];
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
        let sortIcon = document.createElement("img");
        sortIcon.src = "assets/arrow.svg"
        sortIcon.id = "sort-icon";
        target.appendChild(sortIcon);
        this.realInfoList = sortColumn(this.realInfoList, target.id);
        target.classList.add("sorted");
    }

    toggleModal(index: number) {
        this.isModalActive = !this.isModalActive;
        if (this.isModalActive) {
            this.modalData.postTitle = this.realInfoList[index].title;
            this.modalData.commentsAmount = this.realInfoList[index].commentsAmount;
            this.modalData.postText = this.realInfoList[index].text;
            this.dataService.getPostComments(this.realInfoList[index].id)
            .then(res => this.modalData.comments = res);
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

    handleFilterData(filterText: string) {
        removeSortsFromTableHeaders();
        this.realInfoList = filterData(this.fullInfoList, filterText);
    }
}