import { Persona } from "./persona";
import { TipoAsistencia } from "./tipoAsistencia";

export class Asistencia {

	id;
	fecha;
	tipoAsistencia: TipoAsistencia;
	persona: Persona;
}