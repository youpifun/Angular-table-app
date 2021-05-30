import { Component, Input } from "@angular/core";
import { ModalData } from "../data.service";

@Component ({
    selector: "modal-window",
    templateUrl: "./modal.html",
    styleUrls: ["./modal.scss"]
})

export class Modal {
    @Input() modalData: ModalData;
}