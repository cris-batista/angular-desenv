import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VagasService } from 'src/libs/data-access/vagas/vagas.service';
import { Vagas } from 'src/libs/models/vagas.model';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    formUpdateVagas: FormGroup;
    messageSucess: string;
    private unsubscribe$: Subject<void>;

    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        public vagasService: VagasService) {
            this.unsubscribe$ = new Subject();
        }

    ngOnInit(): void {
        this.formUpdateVagas = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            type: ['', [Validators.required, Validators.minLength(3)]],
        });

        this.formUpdateVagas.patchValue({ title: this.data.title });
        this.formUpdateVagas.patchValue({ type: this.data.type });
    }

    updateVagas(id: number): void {
        if (this.formUpdateVagas.invalid) {
            return;
        }

        const source = timer(3000);
        const title = this.formUpdateVagas.get('title')?.value;
        const type = this.formUpdateVagas.get('type')?.value;
        const params = new Vagas(title, type);

        this.vagasService
            .updateVagas(params, id)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
                this.messageSucess = 'Vaga atualizada com sucesso!';
                this.formUpdateVagas.reset();
                source.subscribe(() => this.onNoClick());
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
