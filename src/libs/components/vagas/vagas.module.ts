import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/libs/shared/shared.module';
import { VagasRoutingModule } from './vagas-routing.module';
import { VagasComponent } from './vagas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [VagasComponent, ModalComponent],
    imports: [
        CommonModule,
        VagasRoutingModule,
        SharedModule,
        HttpClientModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ],
    entryComponents: [ModalComponent],
})
export class VagasModule {}
