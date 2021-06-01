import { UsersData } from "./data.service"

export function sortColumn(data: UsersData, field:string): UsersData {
    return data.sort((a, b) => a[field] > b[field] ? 1 : -1);
}

export function reverseColumn(data: UsersData): UsersData {
    return data.reverse();
}

export function filterData(data: UsersData, filterString: string, filterFields: Array<string>): UsersData {
    let filteredData = data.filter(element => {
        return filterFields.some(filterField => { 
            return element[filterField].includes(filterString) 
        });
    });
    return filteredData;
}

export function removeSortsFromTableHeaders() {
    let icon = document.getElementById("sort-icon");
    if (icon != null){
        icon.remove();
    }
    Array.from(document.getElementsByTagName("th")).forEach(element => {
        if (element.classList.contains("sorted")) element.classList.remove("sorted");
    });
}

export function addIconToTableHeader(columnHeaderCell: HTMLTableHeaderCellElement) {
    let sortIcon = document.createElement("img");
    sortIcon.src = "assets/arrow.svg"
    sortIcon.id = "sort-icon";
    columnHeaderCell.appendChild(sortIcon);
}