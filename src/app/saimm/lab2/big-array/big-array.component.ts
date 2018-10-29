import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaimmConstants } from '../../saimm.constants';

@Component({
  selector: 'app-big-array',
  templateUrl: './big-array.component.html',
  styleUrls: ['./big-array.component.scss']
})
export class BigArrayComponent {
  @Input() step: number = SaimmConstants.DEFAULT_BIG_ARRAY_STEP;
  @Input() title: string = 'Просмотр сгенерированных значений случайной величины';
  @Input() set array(items: number[]) {
    if (items) {
      this.items = items;
      this.displayedItems = items.slice(0, this.displayedItems.length);
    }
  };
  @Output() stepChange: EventEmitter<number> = new EventEmitter<number>();
  displayedItems: number[] = [];
  items: number[] = [];

  stepChanged() {
    this.stepChange.emit(this.step);
  }

  add() {
    this.displayedItems = this.items.slice(0, this.displayedItems.length + this.step);
  }

  remove() {
    const newLength = this.displayedItems.length - this.step;
    this.displayedItems = newLength <= 0
      ? []
      : this.items.slice(0, newLength);
  }

}
