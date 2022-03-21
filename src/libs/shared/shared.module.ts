import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatMenuModule,
        MatButtonModule,
    ],
    exports: [LayoutComponent],
})
export class SharedModule {}
