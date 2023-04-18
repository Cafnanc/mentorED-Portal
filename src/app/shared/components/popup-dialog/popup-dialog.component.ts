import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {
  selectedRadio: any;
  countries: Array<any> = [
    { name: 'Big-Blue-Button (default)', value: 'bbb', checked: true },
    { name: 'Other plaftorm', value: 'other', checked: false }
];
  constructor(public dialogRef: MatDialogRef<PopupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  changeCountry(event: any) {
    this.selectedRadio = event.value;
  }
}