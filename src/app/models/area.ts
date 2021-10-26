import { User } from "./user";

export class Area {
    id
    nombre:String;
    lider:User;
    referente:User;

    public constructor(init?: Partial<Area>) {
        Object.assign(this, init);
    }
}

