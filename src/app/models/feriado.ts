export class Feriado {
    id: string;
    fecha
    descripcion: string;

    public constructor(init?: Partial<Feriado>) {
        Object.assign(this, init);
    }
}