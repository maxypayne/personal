import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() mainForm: FormGroup;
  @Input() controlName: string;
  @Input() isPending: boolean;
  @Input() isTaken: boolean;
  @Input() isRequired: boolean;
  @Input() isForbidden: boolean;
  constructor() { }
  ngOnInit() {
  }
}
