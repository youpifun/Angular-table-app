interface UserData {
    id: number,
    name: string, 
    city: string,
    title: string,
    text: string,
    commentsAmount: string
}

interface Comment {
    email: string,
    commentText: string
}

export type ModalData = {
    postTitle: string,
    postText: string,
    commentsAmount: string,
    comments: Array<Comment>
}

export type UsersData = Array<UserData>

export class DataService {
    async getUsersData() {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts?_expand=user")
        let result = await response.json();
        let usersData: UsersData = result.map(async (element) =>  {
            return {
                id: element.id,
                name: element.user.name,
                city: element.user.address.city,
                title: element.title,
                text: element.body,
                commentsAmount: await this.getCommentsAmount(element.id)
            };  
        });
        return usersData;
    }

    async getCommentsAmount(postId: number): Promise<string> {
        let response = await fetch("https://jsonplaceholder.typicode.com/comments?postId="+postId);
        let result = await response.json();
        return result.length.toString();
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