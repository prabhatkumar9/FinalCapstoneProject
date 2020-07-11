import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {
  h2msg: string;
  h1msg: string;
  constructor() {}

  ngOnInit(): void {
    this.h1msg = '403';
    this.h2msg = 'Access Denied';
  }
}
