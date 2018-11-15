import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Safe, SafeService } from 'app/core';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHomeComponent implements OnInit {
  safes$: Observable<Safe[]>;

  constructor(private service: SafeService) {}

  ngOnInit() {
    this.safes$ = this.service.getSafes();
  }
}
