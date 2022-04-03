import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarsidenavappComponent } from './common/components/navbarsidenavapp/navbarsidenavapp.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from './materialmodule.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ngZorroModule } from './ngzorro.module';

@NgModule({
    declarations: [NavbarsidenavappComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        OverlayModule,
        MaterialModule,
        ngZorroModule,
        ScrollingModule,
        DragDropModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        NavbarsidenavappComponent,
        FlexLayoutModule,
        ReactiveFormsModule,
        OverlayModule,
        MaterialModule,
        ngZorroModule,
        ScrollingModule,
        DragDropModule,
        FormsModule
    ],
})
export class SharedmodulesModule { }