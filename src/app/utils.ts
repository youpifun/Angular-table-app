import { UsersData } from "./data.service"

export function sortColumn(data: UsersData, field:string) {
    return data.sort((a, b) => a[field] > b[field] ? 1 : -1);
}

export function reverseColumn(data: UsersData) {
    return data.reverse();
}