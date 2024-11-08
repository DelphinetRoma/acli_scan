import { NativeDateAdapter } from '@angular/material/core';
import { environment } from '../environments/environment';

export class CustomDateAdapter extends NativeDateAdapter {
    override getFirstDayOfWeek(): number {
        return environment.weekStartingDay;
    }
}