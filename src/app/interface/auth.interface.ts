export interface IUserCompanies {
    id:number,
    name:string;
    email:string;
    password:string;
    nit:string;
    role:string;
}

export interface IAuthStateCompanies{
    token:string;
    user:IUserCompanies;
}
