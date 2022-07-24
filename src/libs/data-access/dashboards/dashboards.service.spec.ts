import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DashboardsService } from './dashboards.service';

describe('DashboardsService', () => {
    let service: DashboardsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        TestBed.configureTestingModule({
            providers: [
                DashboardsService,
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
            ],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(DashboardsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have getDashboards function', () => {
        const expectedUrl = `http://localhost:3000/general`;
        const mock = {
            name: 'mockName',
            description: 'mockDescription',
        };
        service.getDashboards();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ data: mock });
        expect(request.request.method).toBe('GET');
    });

    it('should have getDashboardsUsers function', () => {
        const expectedUrl = `http://localhost:3000/users`;
        const mock = {
            name: 'mockName',
            credential: 'mockCredential',
            address: 'mockAddress',
        };
        service.getDashboardsUsers();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ data: mock });
        expect(request.request.method).toBe('GET');
    });
});
