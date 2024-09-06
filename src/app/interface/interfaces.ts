export interface IUser {
    id:number;
    company:string;
    nit:string;
    name:string;
    password:string;
    email:string;
    role:string;
    phone:string;   
    token:string;
}

export interface IAuthState{
    user?:IUser|null;
    IsAuthTenticated:boolean;
    loading:boolean;
    error:string|null;
}
