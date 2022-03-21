import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/libs/shared/shared.module';
import { QuemSomosRoutingModule } from './quem-somos-routing.module';
import { QuemSomosComponent } from './quem-somos.component';

@NgModule({
    declarations: [QuemSomosComponent],
    imports: [
        CommonModule,
        QuemSomosRoutingModule,
        SharedModule,
    ],
})
export class QuemSomosModule {}
