import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Vagas } from 'src/libs/models/vagas.model';

import { VagasService } from './vagas.service';

describe('VagasService', () => {
    let service: VagasService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        TestBed.configureTestingModule({
            providers: [
                VagasService,
                {
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testApiUrl' }),
                    },
                },
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
            ],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(VagasService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have getVagas function', (done) => {
        const expectedUrl = `http://localhost:3000/vagas`;
        let response: Vagas[];

        service.getVagas().subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([{ title: 'setTitle', type: 'setType' }]);

        expect(request.request.method).toBe('GET');
    });

    it('should have deleteVagas function', (done) => {
        const id = 1;
        const expectedUrl = `http://localhost:3000/vagas/${id}`;
        let response: Vagas;

        service.deleteVagas(id).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ title: 'setTitle', type: 'setType' });

        expect(request.request.method).toBe('DELETE');
    });

    it('should have createVagas function', (done) => {
        const expectedUrl = `http://localhost:3000/vagas`;
        let response: Vagas;

        service.createVagas({ title: 'setTitle', type: 'setType' }).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ title: 'setTitle', type: 'setType' });

        expect(request.request.method).toBe('POST');
    });

    it('should have updateVagas function', (done) => {
        const id = 1;
        const expectedUrl = `http://localhost:3000/vagas/${id}`;
        let response: Vagas;

        service.updateVagas({ title: 'setTitle', type: 'setType' }, id).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ title: 'setTitle', type: 'setType' });

        expect(request.request.method).toBe('PUT');
    });
});
