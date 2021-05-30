import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";

interface UserData {
    id: number,
    name: string, 
    city: string,
    title: string,
    text: string,
    commentsAmount: number
}

interface Comment {
    email: string,
    commentText: string
}

export type ModalData = {
    postText: string,
    commentsAmount: number,
    comments: Array<Comment>
}

export type UsersData = Array<UserData>

export class DataService {
    async getUsersData() {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts")
        let result = await response.json();
        let usersData: UsersData = result.map(async (element) =>  {
            let result = await this.getUserNameAndAddress(element.userId);
            return {
                id: element.id,
                name: result.name,
                city: result.city,
                title: element.title,
                text: element.body,
                commentsAmount: await this.getCommentsAmount(element.id)
            };  
        });
        return usersData;
    }
    
    async getUserNameAndAddress(userId: number) {
        let response = await fetch("https://jsonplaceholder.typicode.com/users/"+userId)
        let result = await response.json();
        return {
            name: result.name,
            city: result.address.city
        };
    }

    async getCommentsAmount(postId: number): Promise<number> {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments?postId="+postId);
        let result = await response.json();
        return result.length;
    }

    async getPostComments(postId: number): Promise<Comment[]> {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments?postId="+postId);
        let result = await response.json();
        let comments: Comment[] = result.map(element => ({
            email: element.email,
            commentText: element.body
        }))
        return comments;
    }
}