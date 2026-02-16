export interface User {
    id:string ,
    displayName:string , 
    email:string,
    imageUrl?:string,
    token:string   
}

export interface LoginCreds{
    email:string,
    password:string
}

export interface RegisterCreds {
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
    gender:string,
    dateOfBirth:Date,
    city:string,
    country:string
}