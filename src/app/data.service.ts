export interface Post {
    id: number,
    authorName: string, 
    authorCity: string,
    title: string,
    text: string,
    comments: Comment[],
    commentsAmount: number
}

interface Comment {
    email: string,
    commentText: string
}

export type FiltersData = Map<string, string>;

export type FilterData = {fieldToFilter: string, value: string}

export class DataService {
    async getUsersData(): Promise<Array<Post>> {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments")
        let result = await response.json();
        let postsData: Array<Post> = result.map(async (element) =>  {
            return {
                id: element.id,
                authorName: element.user.name,
                authorCity: element.user.address.city,
                title: element.title,
                text: element.body,
                comments: element.comments.map(item => ({
                    email: item.email,
                    commentText: item.body
                })),
                commentsAmount: element.comments.length.toString()
            };  
        });
        return postsData;
    }
}