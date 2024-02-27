import { MyUser } from "./MyUser";

export class UserParams
{
    minAge = 18;
    maxAge = 70;
    bloodGroup: string;
    city: string;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';

    constructor(user: MyUser)
    {
        this.bloodGroup = user.bloodGroup
        this.city = user.city
    }
}