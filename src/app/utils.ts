import { UsersData } from "./data.service"

export function sortColumn(data: UsersData, field:string) {
    return data.sort((a, b) => a[field] > b[field] ? 1 : -1);
}

export function reverseColumn(data: UsersData) {
    return data.reverse();
}

export function filterData(data: UsersData, filterString: string): UsersData {
    let filteredData = data.filter(element => {
        return element.title.includes(filterString);
    });
    return filteredData;
}

export function removeSortsFromTableHeaders() {
    Array.from(document.getElementsByTagName("th")).forEach(element => {
        if (element.classList.contains("sorted")) element.classList.remove("sorted");
    });
}