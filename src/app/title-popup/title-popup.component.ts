import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-title-popup',
  templateUrl: './title-popup.component.html',
  styleUrls: ['./title-popup.component.css'],
})
export class TitlePopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }) {}
}
