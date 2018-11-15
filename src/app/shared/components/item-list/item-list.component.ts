import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SafeItem, Safe } from '~core/model';

@Component({
  selector: 'cool-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {
  @Input()
  items: SafeItem[];

  @Output()
  showInvoice = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
