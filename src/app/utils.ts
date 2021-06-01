import { Post } from "./data.service"

export function sortColumn(data: Array<Post>, field:string): Array<Post> {
    return data.sort((a, b) => a[field] > b[field] ? 1 : -1);
}

export function filterData(data: Array<Post>, filterString: string, filterFields: Array<string>): Array<Post> {
    let filteredData = data.filter(element => {
        return filterFields.some(filterField => {
            return element[filterField].includes(filterString);
        });
    });
    return filteredData;
}