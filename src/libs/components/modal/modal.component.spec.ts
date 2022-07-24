import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';


// modules
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VagasService } from 'src/libs/data-access/vagas/vagas.service';
import { VagasServiceMock } from 'src/libs/data-access/mocks/vagas.service.mock';
import { of } from 'rxjs';
import { Vagas } from 'src/libs/models/vagas.model';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(async () => {
        const MatDialogRefStub = () => ({ close: () => ({}) });
        const dialogMock = {
            close: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
            declarations: [
                ModalComponent,
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: [] },
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: VagasService, useClass: VagasServiceMock }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a onNoClick function', () => {
        const spy = spyOn(component.dialogRef, 'close');
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    });

    it('should have updateVagas function (success case)', () => {
        const vagasServiceStub: VagasService = TestBed.inject(VagasService);
        const serviceSpy = spyOn(vagasServiceStub, 'updateVagas').and.returnValue(of({ title: 'setTitle', type: 'setType' }));
        const id = 1;

        component.updateVagas(id);

        component.formUpdateVagas.get('title')?.setValue('setTitle');
        component.formUpdateVagas.get('type')?.setValue('setType');
        component.formUpdateVagas.updateValueAndValidity();

        const expectedParams = new Vagas('setTitle', 'setType');

        component.updateVagas(id);
        expect(serviceSpy).toHaveBeenCalledWith(expectedParams, id);
        expect(component.messageSucess).toEqual('Vaga atualizada com sucesso!');
    });
});
