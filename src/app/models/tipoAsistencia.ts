export class TipoAsistencia {
    id;
	tipoAsistencia: string;

    public constructor(init?: Partial<TipoAsistencia>) {
        Object.assign(this, init);
    }
}