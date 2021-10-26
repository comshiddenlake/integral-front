import { TestBed } from '@angular/core/testing';

import { TipoAsistenciaService } from './tipo-asistencia.service';

describe('TipoAsistenciaService', () => {
  let service: TipoAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
