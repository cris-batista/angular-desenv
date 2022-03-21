import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// data-access
import { CoreDataAccessService } from '@picpay/shared/core/data-access';

import { ServicesModel } from '../../models/services-model';
import { VariablesGetModel } from '../../models/variables-get-model';
import { VariablesModel } from '../../models/variables-model';
import { VariablesRequestModel } from '../../models/variables-request-model';
import { VariableType } from '../../models/variables-type';
import { VariablesUpdateModel } from '../../models/variables-update-model';
import { VariablesService } from './variables.service';

describe('VariablesService', () => {
    let service: VariablesService;
    let dataAcessService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        TestBed.configureTestingModule({
            providers: [
                VariablesService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testApiUrl' }),
                    },
                },
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
            ],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(VariablesService);
        dataAcessService = TestBed.inject(CoreDataAccessService);
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

    it('should have getVariables function', (done: jest.DoneCallback) => {
        const page = '0';
        const size = 10;
        const mockVariables = new VariablesGetModel([], 10);
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars?page=${page}&size=${size}`;
        const expectedResponse = [mockVariables];

        let response: VariablesGetModel;

        service.getVariables(page, size).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have getPageItems function', (done: jest.DoneCallback) => {
        const page = '1';
        const size = 10;
        const query = 'mock';
        const mockVariables = new VariablesGetModel([], 10);

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars?query=${query}&page=${page}&size=${size}`;
        const expectedResponse = [mockVariables];

        let response: VariablesGetModel;

        service.getPageItems(page, size, query).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have getVariableKey function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesUpdateModel('testValue', VariableType.PLAIN);
        const key = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;
        const expectedResponse = [mockVariables];

        let response: VariablesUpdateModel;

        service.getVariableKey(key).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have getVariableVersion function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesModel('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}`;
        const expectedResponse = [mockVariables];

        let response: VariablesModel;

        service.getVariableVersion(key, version).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have createVariable function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesRequestModel('testKey');
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars`;
        const expectedResponse = [mockVariables];

        let response: VariablesRequestModel;

        service.createVariable(mockVariables).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(mockVariables);
        expect(response).toEqual(expectedResponse);
    });

    it('should have updateVariable function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesModel('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const parameters: VariablesUpdateModel = {
            value: 'testValue',
            type: VariableType.PLAIN,
        };
        const key = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;
        const expectedResponse = [mockVariables];

        let response: VariablesModel;

        service.updateVariable(key, parameters).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(parameters);
        expect(response).toEqual(expectedResponse);
    });

    it('should have deleteVariable function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesModel('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;
        const expectedResponse = [mockVariables];

        let response: VariablesModel;

        service.deleteVariable(key).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('DELETE');
        expect(response).toEqual(expectedResponse);
    });

    it('should have showValueSecret function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesModel('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}/decrypt`;
        const expectedResponse = [mockVariables];

        let response: VariablesModel;

        service.showValueSecret(key, version).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have rollbackVariable function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesModel('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const parameters: VariablesUpdateModel = {
            value: 'testValue',
            type: VariableType.PLAIN,
        };
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}/rollback`;
        const expectedResponse = [mockVariables];

        let response: VariablesModel;

        service.rollbackVariable(key, version, parameters).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(parameters);
        expect(response).toEqual(expectedResponse);
    });

    it('should have getServiceKey function', (done: jest.DoneCallback) => {
        const mockVariables = new ServicesModel('testService', 'testKey', 'testAlias', 'testStage');
        const key = 'mock';
        const stage = 'mockQa';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/services`;
        const expectedResponse = [];

        let response: ServicesModel[];

        service.getServiceKey(key, stage).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have associateService function', (done: jest.DoneCallback) => {
        const mockVariables = new ServicesModel('testService', 'testKey', 'testAlias', 'testStage');
        const parameters: ServicesModel = {
            service: 'testService',
            key: 'testKey',
            alias: 'testAlias',
            stage: 'testStage',
        };
        const param = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${param}/env-vars`;
        const expectedResponse = [mockVariables];

        let response: ServicesModel;

        service.associateService(param, parameters).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(parameters);
        expect(response).toEqual(expectedResponse);
    });

    it('should have desassociateService function', (done: jest.DoneCallback) => {
        const mockVariables = new ServicesModel('testService', 'testKey', 'testAlias', 'testStage');
        const paramService = 'mockService';
        const paramkey = 'mockKey';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${paramService}/env-vars/${paramkey}`;
        const expectedResponse = [mockVariables];

        let response: ServicesModel;

        service.desassociateService(paramService, paramkey).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('DELETE');
        expect(response).toEqual(expectedResponse);
    });

    it('should have getServiceSearch function', (done: jest.DoneCallback) => {
        const mockVariables = new ServicesModel('testService', 'testKey', 'testAlias', 'testStage');
        const paramService = 'mockService';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${paramService}/env-vars`;
        const expectedResponse = [mockVariables];

        let response: ServicesModel[];

        service.getServiceSearch(paramService).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });
});
