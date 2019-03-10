export interface IUser {
    id: string
    firstName: string
    lastName: string
    userName: string
    email:string
    role:Role
    token:string
    caloriesTarget:number
  }

  export interface IRegisterUser{
    userName:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirm:string,
  }

  export enum Role{
    regular,
    manager,
    admin
  }