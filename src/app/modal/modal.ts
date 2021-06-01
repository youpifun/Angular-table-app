import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalData } from "../data.service";

@Component ({
    selector: "modal-window",
    templateUrl: "./modal.html",
    styleUrls: ["./modal.scss"]
})

export class Modal {
    @Input() modalData: ModalData;
    @Output() closeModal = new EventEmitter<boolean>()

    handleModalClick($event: MouseEvent) {
        let target = $event.target as HTMLElement;
        if (!(target.classList.contains("modal")||target.classList.contains("modal-container__close-btn"))) {
            return;
        }
        this.closeModal.emit();
    }
}