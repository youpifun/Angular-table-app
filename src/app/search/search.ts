import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "search",
    templateUrl: "./search.html",
    styleUrls: ["./search.scss"]
})

export class Search {
    lastCallTimer = null;
    @Output() filterStringInputed = new EventEmitter<string>();
    handleUserInput($event: InputEvent) {
        let target = $event.target as HTMLInputElement
        clearTimeout(this.lastCallTimer);
        this.lastCallTimer = setTimeout(() => this.filterStringInputed.emit(target.value), 500);
    }
}