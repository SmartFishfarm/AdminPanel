import { TimestampToDatePipe } from './timestamp-to-date.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [TimestampToDatePipe],
    declarations: [TimestampToDatePipe]
})
export class SharedPipesModule { }
