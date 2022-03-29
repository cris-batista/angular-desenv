import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

    it('should be destroyed', () => {
        expect(service.ngOnDestroy).toBeDefined();
        service.ngOnDestroy();
    });
});
