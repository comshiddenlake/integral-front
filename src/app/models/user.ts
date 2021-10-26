import { Area } from "./area";
import { Persona } from "./persona";
import { Role } from "./role";

export class User {
    id:string;
    username: string;
    email: string;
    area:Area;
    persona:Persona;
    password: string;
    role:Role;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}