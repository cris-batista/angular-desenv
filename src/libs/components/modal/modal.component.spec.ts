import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

// ng-mocks
import { MockComponent, MockModule } from 'ng-mocks';

// modules
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariablesCreateComponent } from '../pages/create/create.component';
import { VariablesDeleteComponent } from '../pages/delete/delete.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(async () => {
        const MatDialogRefStub = () => ({ close: () => ({}) });

        await TestBed.configureTestingModule({
            imports: [MockModule(MatDialogModule)],
            declarations: [
                ModalComponent,
                MockComponent(VariablesCreateComponent),
                MockComponent(VariablesDeleteComponent),
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {}, useFactory: MatDialogRefStub },
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
        const MatDialogRefStub: MatDialogRef<any> | undefined = TestBed.inject(MatDialogRef);

        const spy = spyOn(MatDialogRefStub, 'close').and.callThrough();
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    });
});
