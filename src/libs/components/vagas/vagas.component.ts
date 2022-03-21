import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import { VagasService } from 'src/libs/data-access/vagas/vagas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Vagas } from 'src/libs/models/vagas.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'vagas',
    templateUrl: './vagas.component.html',
    styleUrls: ['./vagas.component.scss'],
})
export class VagasComponent implements OnInit, OnDestroy{
    vagas: MatTableDataSource<Vagas>;
    displayedColumns: string[] = ['title', 'type', 'delete', 'edit'];
    formCreateVagas: FormGroup;
    messageSucess: string;
    isLoading: boolean;
    
    private unsubscribe$: Subject<void>;
    
    constructor(public vagasService: VagasService, private formBuilder: FormBuilder, public dialog: MatDialog) {
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.formCreateVagas = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            type: ['', [Validators.required, Validators.minLength(3)]],
        });

        this.getVagas();
        this.startUpdateSubscription();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getVagas(): void {
        this.isLoading = true;

        this.vagasService
            .getVagas()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(response => {
                this.vagas = new MatTableDataSource(response);
                this.isLoading = false;
            });
    }

    deleteVagas(id: number): void {
        this.vagasService
            .deleteVagas(id)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.getVagas())
            )
            .subscribe();
    }

    createVagas(): void {
        if (this.formCreateVagas.invalid) {
            return;
        }

        const title = this.formCreateVagas.get('title')?.value;
        const type = this.formCreateVagas.get('type')?.value;
        const params = new Vagas(title, type);

        this.vagasService
        .createVagas(params)
        .pipe(
            takeUntil(this.unsubscribe$),
            finalize(() => this.getVagas())
        )
        .subscribe(() => {
            this.messageSucess = 'Vaga criada com sucesso!';
            this.formCreateVagas.reset();
        });
    }

    openDialog(id: number, title: string, type: string) {
        const config: MatDialogConfig = {
            data: {
                id: id,
                title: title,
                type: type,
                update: 'update',
            },
        };

        this.dialog.open(ModalComponent, config);
    }

    startUpdateSubscription(): void {
        this.vagasService.onUpdateVagas
            .pipe(
                takeUntil(this.unsubscribe$),
                tap(() => this.getVagas()),
            )
            .subscribe();
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.vagas.filter = filterValue.trim().toLowerCase();
    }
}
