import { Component } from "@angular/core";
import { DataService, UsersData, ModalData } from "./data.service";
import { sortColumn, reverseColumn } from "./utils";

@Component({
    selector: "table-app",
    template: `<modal-window 
                    *ngIf="isModalActive"
                    [modalData]="modalData"
                    (modalClicked)="toggleModal()"></modal-window>
                <info-table 
                    [infoList]="infoList" 
                    (headerClicked)="sortColumnHandler($event)" 
                    (rowClicked)="toggleModal($event)"
                >
                </info-table>`,
    providers: [DataService]
})
export class AppComponent { 
    infoList: UsersData = [];
    isModalActive: boolean = false;
    modalData: ModalData | null = {
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
                this.infoList = res;
            });
        })();
    }
    
    sortColumnHandler($event: MouseEvent) {
        let target = $event.target as Element;
        if (target.classList.contains("sorted")) {
            this.infoList = reverseColumn(this.infoList);
            return;
        }
        Array.from(document.getElementsByTagName("th")).forEach(element => {
            if (element.classList.contains("sorted")) element.classList.remove("sorted");
        });
        this.infoList = sortColumn(this.infoList, target.id);
        target.classList.add("sorted");
    }

    toggleModal(index: number) {
        this.isModalActive = !this.isModalActive;
        if (this.isModalActive) {
            this.modalData.postTitle = this.infoList[index].title;
            this.modalData.commentsAmount = this.infoList[index].commentsAmount;
            this.modalData.postText = this.infoList[index].text;
            this.dataService.getPostComments(this.infoList[index].id)
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
}