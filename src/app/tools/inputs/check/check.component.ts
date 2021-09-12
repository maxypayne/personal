import {
  Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import attrGlobal from './attr';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-checkbox',
  templateUrl: './check.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit, OnChanges, OnDestroy {
  @Output() changeVal: EventEmitter<{id: string, cleaned?: any, checked?: boolean, how?: string}> = new EventEmitter();
  @Output() register: EventEmitter<{id: string, register: boolean, newData: boolean}> = new EventEmitter();
  @Input() pushData: any;
  @Input() pushDataRegister: any;
  @Input() pushDataNoEmit: any;
  @Input() disable: boolean;
  @Input() checkboxAttr: {
    id: string,
    idToUpdate?: string,
    key?: string,
    cssClass?: string,
    value?: string,
    error?: boolean,
    type?: string,
    updatedPrice?: number,
    labelPerso?: string,
    prixPerso?: number,
  };
  desktop$: Subscription;
  id: string;
  idToUpdate: string;
  key: string;
  cssClass: string;
  value: string;
  mandatory: boolean;
  attr: {};
  label: string;
  hasErr: boolean;
  newData: {id: string, cleaned?: any, checked?: boolean, how?: string};
  desktop: boolean;
  disableCheckbox: boolean;
  text: [];
  imageText: string;
  type: string;
  prix: number;
  formatWebp: boolean;
  constructor(private app: AppService) {
    this.desktop = app.desktopInit;
    this.desktop$ = app.desktop.subscribe(desktop => this.desktop = desktop);
    this.formatWebp = app.formatWebp;
  }
  ngOnDestroy() {
    this.desktop$.unsubscribe();
  }
  ngOnInit() {
    if (this.checkboxAttr && !this.id) {
      this.handleAttr('init');
    }
  }
  handleAttr(how) {
    const { id, idToUpdate, key, cssClass, value, type, updatedPrice, labelPerso, prixPerso } = this.checkboxAttr;
    if (id && attrGlobal[id]) {
      const { label, mandatory, infoText, prix } = attrGlobal[id];
      this.attr = attrGlobal[id];
      this.label = labelPerso || label || null;
      this.mandatory = mandatory;
      this.id = id;
      this.cssClass = cssClass || '';
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.imageText = infoText;
      this.prix = prixPerso || updatedPrice || prix;
      this.type = type || 'default';
      if (how === 'pushData') {
        this.value = this.pushData;
      } else if (how === 'pushDataRegister') {
        this.value = this.pushDataRegister;
      } else if (how === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
      } else {
        this.value = value || null;
      }
      if (this.value) {
        this.handleValue(this.value, true, how !== 'pushDataNoEmit');
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.checkboxAttr) {
      const { idToUpdate, key, error, labelPerso, prixPerso } = this.checkboxAttr;
      this.idToUpdate = idToUpdate;
      this.key = key;
      if (error !== undefined) {
        this.hasErr = error;
      }
      if (labelPerso) {
        this.label = labelPerso;
      }
      if (prixPerso) {
        this.prix = prixPerso;
      }
    }
    if (changes.pushData && this.pushData && this.pushData !== this.value) {
      this.handlePushData('pushData');
    }
    if (changes.pushDataRegister && this.pushDataRegister) {
      this.handlePushData('pushDataRegister');
    }
    if (changes.pushDataNoEmit && this.pushDataNoEmit && this.pushDataNoEmit !== this.value) {
      this.handlePushData('pushDataNoEmit');
    }
    if (changes.disable) {
      this.disableCheckbox = changes.disable.currentValue;
    }
  }
  handlePushData(which) {
    if (!this.id) {
      this.id = this.checkboxAttr.id;
      this.handleAttr(which);
    } else {
      if (which === 'pushData') {
        this.value = this.pushData;
      } else if (which === 'pushDataRegister') {
        this.value = this.pushDataRegister;
      } else if (which === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
      }
      this.handleValue(this.value, true, which !== 'pushDataNoEmit');
    }
  }
  handleValue(cleaned, checked, emit) {
    this.value = cleaned;
    this.newData = {id: this.id, cleaned, checked};
    if (checked) {
      this.hasErr = false;
    }
    if (emit) {
      this.changeVal.emit(this.newData);
    }
  }
  handleClick(event) {
    if (!this.disableCheckbox) {
      if (event && event.target && event.target.localName === 'u' && this.attr['popup']) {
        this.app.popupInfos.next({state: true, id: this.attr['popup'], infos: {}});
        this.app.popupScroll.next({pageY: event.pageY, screenY: event.y});
      } else {
        this.value = this.value === 'O' ? 'N' : 'O';
        this.hasErr = this.mandatory ? this.value !== 'O' : false;
        this.newData = {id: this.id, cleaned: this.value, checked: !this.hasErr};
        this.changeVal.emit(this.newData);
        this.registerData('click');
      }
    }
  }
  registerData(how: string) {
    if (this.newData && this.idToUpdate && this.key) {
      const { cleaned } = this.newData;
      this.app.api('post', '/update/input', {id: this.idToUpdate, key: this.key, value: cleaned, how})
        .then(() => this.register.emit( { id: this.id, register: true, newData: true }))
        .catch(() => {
          this.register.emit({ id: this.id, register: false, newData: false });
          this.handleValue(null, false, false);
          this.hasErr = true;
        });
    } else {
      this.register.emit({ id: this.id, register: true, newData: false });
    }
  }
}
