import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableGridComponent } from './reusable-grid.component';
import { ReusableGridColumnComponent } from './reusable-grid-column/reusable-grid-column.component';
import { ReusableGridHeaderTemplateDirective } from './directives/reusable-grid-header-template.directive';
import { ReusableGridCellTemplateDirective } from './directives/reusable-grid-cell-template.directive';



@NgModule({
  declarations: [
    ReusableGridComponent,
    ReusableGridColumnComponent,
    ReusableGridHeaderTemplateDirective,
    ReusableGridCellTemplateDirective,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReusableGridComponent,
    ReusableGridColumnComponent,
    ReusableGridHeaderTemplateDirective,
    ReusableGridCellTemplateDirective
  ]
})
export class ReusableGridModule { }
