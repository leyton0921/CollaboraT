export interface IUserCompanies {
    name:string;
    email:string;
    password:string;
    nit:string;
}

export interface IAuthStateCompanies{
    token:string;
    user:IUserCompanies;
}
