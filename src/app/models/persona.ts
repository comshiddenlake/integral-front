import { Area } from "./area";
import { Asistencia } from "./asistencia";

export class Persona {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento;
    inicioActividad;
    finActividad;
    area: Area;
    asistencia: Array<any>;

    public constructor(init?: Partial<Persona>) {
        Object.assign(this, init);
    }
}