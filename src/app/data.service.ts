interface UserData {
    name: string, 
    city: string,
    title: string,
    commentsAmount: number
}

export type UsersData = Array<UserData>

export class DataService {
    async getUsersData() {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts")
        let result = await response.json();
        let usersData: UsersData = result.map(async (element) =>  {
            let result = await this.getUserNameAndAddress(element.userId);
            return {
                name: result.name,
                city: result.city,
                title: element.title,
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
}