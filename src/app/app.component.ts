import { Component } from "@angular/core";
import { DataService, UsersData } from "./data.service";
import { sortColumn, reverseColumn } from "./utils";

@Component({
    selector: "table-app",
    template: `<info-table [infoList]="infoList" (headerClicked)="sortColumnHandler($event)"></info-table>`,
    providers: [DataService]
})
export class AppComponent { 
    infoList: UsersData = [];

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
}