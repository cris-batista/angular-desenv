import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { VagasServiceMock } from 'src/libs/data-access/mocks/vagas.service.mock';
import { VagasService } from 'src/libs/data-access/vagas/vagas.service';
import { SharedModule } from 'src/libs/shared/shared.module';

import { VagasComponent } from './vagas.component';
import { Vagas } from 'src/libs/models/vagas.model';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('VagasComponent', () => {
  let component: VagasComponent;
  let fixture: ComponentFixture<VagasComponent>;

  const mockDialog = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatPaginatorModule
      ],
      declarations: [ VagasComponent ],
      providers: [
        { provide: VagasService, useClass: VagasServiceMock },
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getVagas function', () => {
    const vagasServiceStub: VagasService = TestBed.inject(VagasService);
    const expectedVagas = new MatTableDataSource([{ title: 'setTitle', type: 'setType' }]);
    const serviceSpy = spyOn(vagasServiceStub, 'getVagas').and.returnValue(of([{ title: 'setTitle', type: 'setType' }]));

    component.getVagas();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.vagas.toString()).toEqual(expectedVagas.toString());
});

  it('should have createVagas function (success case)', () => {
    const vagasServiceStub: VagasService = TestBed.inject(VagasService);
    const serviceSpy = spyOn(vagasServiceStub, 'createVagas').and.returnValue(of({ title: 'setTitle', type: 'setType' }));

    component.createVagas();

    component.formCreateVagas.get('title')?.setValue('setTitle');
    component.formCreateVagas.get('type')?.setValue('setType');
    component.formCreateVagas.updateValueAndValidity();

    const expectedParams = new Vagas('setTitle', 'setType');

    component.createVagas();
    expect(serviceSpy).toHaveBeenCalledWith(expectedParams);
    expect(component.messageSucess).toEqual('Vaga criada com sucesso!');
  });

  it('should have deleteVagas function', () => {
    const vagasServiceStub: VagasService = TestBed.inject(VagasService);
    const serviceSpy = spyOn(vagasServiceStub, 'deleteVagas').and.returnValue(of({ title: 'setTitle', type: 'setType' }));
    const id = 1;

    component.deleteVagas(id);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should have a openDialog function', () => {
    component.openDialog(1, 'mockTitle', 'mockType');
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
