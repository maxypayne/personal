import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges,
  OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import attrGlobal from './attr';
import data from './data';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-sel',
  templateUrl: './sel.component.html',
  styleUrls: ['./sel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SelComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('selectContainer', { static: true }) elContainer: ElementRef;
  @ViewChild('selectElem', { static: true }) elElem: ElementRef;
  @ViewChild('list', { static: true }) elList: ElementRef;
  @ViewChild('flecheDown', { static: true }) elFlecheDown: ElementRef;
  @ViewChild('icon', { static: true }) elIcon: ElementRef;
  @ViewChild('options', { static: true }) elOptions: ElementRef;
  @Output() changeVal: EventEmitter<{id: string, cleaned?: any, checked?: boolean, how?: string}> = new EventEmitter();
  @Output() register: EventEmitter<{id: string, register: boolean, newData: boolean}> = new EventEmitter();
  @Output() clickEmit: EventEmitter<string> = new EventEmitter();
  @Output() sendOptionsHeight: EventEmitter<number> = new EventEmitter();
  @Input() clear: number;
  @Input() cpltList: string;
  @Input() pushData: any;
  @Input() pushDataRegister: any;
  @Input() pushDataNoEmit: any;
  @Input() selActive;
  @Input() selAttr: {
    id: string,
    idToUpdate?: string,
    key?: string,
    type?: string,
    cssClass?: string,
    value?: string,
    label?: string,
    cplt?: string,
    info?: string,
    empty?: string,
    defaultValue?: string,
    verif?: boolean,
    optionnel?: boolean,
    lock?: boolean,
    focus?: boolean,
    labelHide?: boolean,
    labelNone?: boolean,
    active?: boolean,
    recherche?: boolean,
    initValue?: string,
    error?: boolean,
    showVerifLabel?: boolean,
    showRepere?: boolean,
    iconHoverContent?: string,
    etatVehicule?: string,
    hoverBloc?: boolean,
    dynamicList?: {},
    dynamiqueField?: boolean,
    noDynamiqueResult?: boolean,
  };
  desktop$: Subscription;
  id: string;
  idToUpdate: string;
  key: string;
  type: string;
  cssClass: string;
  value: string;
  label: string;
  info: string;
  defaultValue: string;
  optionnel: boolean;
  cplt: string;
  lock: boolean;
  focus: boolean;
  labelHide: boolean;
  labelNone: boolean;
  hasErr: boolean;
  recherche: boolean;
  initValue: string;
  showVerifLabel: boolean;
  showRepere: boolean;
  newData: {id: string, cleaned?: any, checked?: boolean, how?: string};
  listShow: boolean;
  listData: {};
  choices: string[];
  elemHover: number;
  optionsShow: number;
  optionHeight = 38;
  hover: boolean;
  blur: boolean;
  verifLabel: boolean;
  iconHover: boolean;
  iconHoverContent: string;
  move: boolean;
  hoverBloc: boolean;
  showHoverBloc: boolean;
  topHoverBloc: boolean;
  hoverBlocText: string;
  desktop: boolean;
  dynamicList: {};
  dynamiqueField: boolean;
  empty: string;
  noDynamiqueResult: boolean;
  showFleche: boolean;
  valuePushed: string;
  errorMessage: string;
  etatVehicule: string;
  constructor(private app: AppService) {
    this.desktop = app.desktopInit;
    this.desktop$ = app.desktop.subscribe(desktop => this.desktop = desktop);
  }
  ngOnDestroy() {
    this.desktop$.unsubscribe();
  }
  @HostListener('body:mouseup', ['$event'])
  onClickDesktop(event) {
    if (this.listShow && event && event.composedPath) {
      let show = false;
      event.composedPath().forEach((elem) => {
        if (elem === this.elElem.nativeElement || elem === this.elFlecheDown.nativeElement || elem === this.elIcon.nativeElement) {
          show = true;
        }
      });
      if (!show) {
        this.closeList();
      }
    }
  }
  ngOnInit() {
    if (this.selAttr && !this.id) {
      this.handleAttr('init');
    }
  }
  ngAfterViewInit() {
    if (this.focus && !this.lock) {
      this.elElem.nativeElement.focus();
    }
  }
  handleAttr(how) {
    const {
      id, idToUpdate, key, cssClass, value, optionnel, lock, focus, labelHide, labelNone, label, cplt,
      defaultValue, recherche, showVerifLabel, iconHoverContent, hoverBloc, dynamicList, dynamiqueField, noDynamiqueResult,
      showRepere, etatVehicule,
    } = this.selAttr;
    if (id && attrGlobal[id]) {
      const {
        type, label: labelAttr, info, empty, listData, hoverBlocText, errorMessge, infoText,
      } = attrGlobal[id];
      this.type = type || '';
      this.label = label || labelAttr;
      this.info = info;
      this.id = id;
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.cssClass = cssClass || '';
      if (empty && !this.empty) {
        this.empty = empty;
      }
      this.defaultValue = defaultValue || this.empty || '';
      this.cplt = this.cpltList || cplt;
      this.optionnel = optionnel;
      this.lock = lock;
      this.focus = focus;
      this.labelHide = labelHide;
      this.labelNone = labelNone;
      this.recherche = recherche;
      this.listData = listData || {};
      this.elemHover = 0;
      this.optionsShow = 0;
      this.showVerifLabel = showVerifLabel;
      this.showRepere = showRepere;
      this.iconHoverContent = iconHoverContent;
      this.hoverBloc = hoverBloc;
      this.hoverBlocText = hoverBlocText;
      this.dynamicList = dynamicList;
      this.dynamiqueField = dynamiqueField;
      this.noDynamiqueResult = noDynamiqueResult;
      this.errorMessage = errorMessge;
      this.etatVehicule = etatVehicule;
      if (how === 'pushData') {
        this.value = this.pushData;
        this.valuePushed = this.value;
      } else if (how === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
        this.valuePushed = this.value;
      } else {
        this.value = value || null;
        this.valuePushed = null;
      }
      this.handleChoices();
      if (this.value) {
        this.handleValue(this.value, true, how === 'pushData' || how === 'pushDataRegister');
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.selAttr) {
      const {
        idToUpdate, key, focus, initValue, lock, error, empty, defaultValue,
        dynamicList, dynamiqueField, noDynamiqueResult, etatVehicule,
      } = this.selAttr;
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.focus = focus;
      this.handleLock(lock);
      if (dynamicList !== undefined) {
        this.dynamicList = dynamicList;
        this.handleChoices();
      }
      if (dynamiqueField !== undefined) {
        this.dynamiqueField = dynamiqueField;
      }
      if (initValue) {
        this.initValue = initValue;
        this.handleValue(initValue, true, false);
      }
      if (this.focus && !this.lock) {
        this.elElem.nativeElement.focus();
      }
      if (error !== undefined) {
        this.hasErr = error;
      }
      if (noDynamiqueResult) {
        this.noDynamiqueResult = noDynamiqueResult;
      }
      if (empty || defaultValue) {
        this.empty = empty;
        this.defaultValue = defaultValue || empty || '';
      }
      if (etatVehicule) {
        this.etatVehicule = etatVehicule || 'O';
      }
    }
    if (changes.cpltList && this.cpltList !== undefined && this.cpltList !== this.cplt) {
      if (!this.id) {
        this.id = this.selAttr.id;
        this.handleAttr('pushDataNoEmit');
      }
      this.cplt = this.cpltList;
      this.handleChoices();
    }
    if (changes.pushData && this.pushData !== undefined && this.pushData !== this.value) {
      this.handlePushData('pushData');
    }
    if (changes.pushDataRegister && this.pushDataRegister !== undefined) {
      this.handlePushData('pushDataRegister');
    }
    if (changes.pushDataNoEmit && this.pushDataNoEmit !== undefined && this.pushDataNoEmit !== this.value) {
      this.handlePushData('pushDataNoEmit');
    }
    if (changes.clear && this.clear) {
      this.handleClear();
    }
  }
  handlePushData(which) {
    if (!this.id) {
      this.id = this.selAttr.id;
      this.handleAttr(which);
    } else {
      if (which === 'pushData') {
        this.value = this.pushData;
      } else if (which === 'pushDataRegister') {
        this.value = this.pushDataRegister;
      } else if (which === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
      }
      this.valuePushed = this.value;
      this.handleChoices();
      this.handleValue(this.value, !!this.value, which !== 'pushDataNoEmit');
    }
  }
  openList(list?) {
    this.clickEmit.emit(this.id);
    if (!this.desktop) {
      this.handleHoverBloc(true);
    } else {
      this.showHoverBloc = false;
    }
    this.listShow = true;
    setTimeout( () => {
      this.handleOptionsHeight();
      if (list) {
        const { clientHeight, scrollHeight } = list;
        this.showFleche = clientHeight < scrollHeight;
      }
    });
  }
  closeList() {
    if (!this.desktop) {
      this.handleHoverBloc(false);
    }
    this.listShow = false;
    this.elemHover = 0;
    this.optionsShow = 0;
    this.elList.nativeElement.scrollTop = 0;
    this.elElem.nativeElement.blur();
    this.sendOptionsHeight.emit(0);
  }
  handleValue(cleaned, checked, emit) {
    if (this.type) {
      if (this.showVerifLabel) {
        this.verifLabel = checked;
      }
      this.value = cleaned;
      this.hasErr = !checked && !!this.value;
      this.newData = {id: this.type, cleaned, checked};
      if (emit) {
        this.changeVal.emit(this.newData);
      }
    }
  }
  handleFocus(list?) {
    if (!this.lock) {
      this.handleChoices();
      this.openList(list);
    }
  }
  handleBlur() {
    if (!this.lock) {
      this.elemHover = null;
      this.hover = false;
      this.blur = true;
    }
  }
  handleMouseEnter() {
    if (this.desktop) {
      this.handleHoverBloc(true);
    }
  }
  handleMouseLeave() {
    if (this.desktop) {
      this.handleHoverBloc(false);
    }
  }
  handleClear() {
    this.handleValue(null, false, false);
    this.hasErr = false;
    this.defaultValue = this.empty;
    this.valuePushed = null;
    this.registerData('clear');
  }
  handleHover(i) {
    if (!this.lock) {
      const top = Math.floor(this.elList.nativeElement.scrollTop / this.optionHeight);
      this.optionsShow = i - top + 1;
      this.elemHover = i;
      this.hover = true;
      this.blur = false;
    }
  }
  handleKeyDown(event) {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.handleNav(event.key === 'ArrowUp' ? 'up' : 'down');
    } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
      this.handleClick(this.choices[this.elemHover], event.key === 'Enter' ? 'enter' : 'right');
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      this.closeList();
    }
  }
  handleNav(key) {
    const nbr = this.choices.length;
    this.handleShowList(key, nbr);
    if (key === 'up') {
      if (this.elemHover > 0) {
        this.elemHover -= 1;
      } else {
        this.elemHover = nbr - 1;
      }
    } else if (key === 'down') {
      if (this.elemHover < nbr - 1) {
        this.elemHover += 1;
      } else {
        this.elemHover = 0;
      }
    }
  }
  handleShowList(key, nbr) {
    if (this.blur) {
      if (key === 'down') {
        this.elList.nativeElement.scrollTop = 0;
        this.optionsShow = 0;
      } else {
        this.elList.nativeElement.scrollTop = this.optionHeight * nbr;
        this.optionsShow = 6;
      }
      this.blur = false;
    }
    if (key === 'down') {
      if (this.hover && this.optionsShow === 4) {
        this.optionsShow -= 1;
        this.hover = false;
      }
      if (this.optionsShow < 5) {
        this.optionsShow += 1;
      } else {
        this.optionsShow = 5;
      }
    } else {
      if (this.optionsShow > 0) {
        this.optionsShow -= 1;
      } else {
        this.optionsShow = 0;
      }
      if (this.optionsShow === 0) {
        this.hover = false;
      }
    }
    if (this.optionsShow === 5 && key === 'down') {
      if (this.elemHover === nbr - 1) {
        this.elList.nativeElement.scrollTop = 0;
        this.optionsShow = 0;
      } else {
        this.elList.nativeElement.scrollTop += this.optionHeight;
      }
    } else if (this.optionsShow === 0 && key === 'up') {
      if (this.elemHover === 0) {
        this.elList.nativeElement.scrollTop = this.optionHeight * nbr;
        this.optionsShow = 5;
      } else {
        this.elList.nativeElement.scrollTop -= this.optionHeight;
      }
    }
  }
  handleChoices() {
    if (this.dynamicList) {
      this.listData = this.dynamicList;
    } else {
      if (this.id === 'docInvalide') {
        this.listData = data[`docInvalide_${this.cplt}`] || this.listData;
      } else if (this.id === 'marque') {
        this.listData = data[`marque_${this.cplt}`] || data['marque'];
      } else if (this.id === 'demarche') {
        this.listData = data[`demarche_${this.cplt}`] || data['demarche'];
      }
    }
    if (this.listData && !this.lock) {
      this.choices = Object.keys(this.listData);
    }
  }
  handleClick(choice, how, event?) {
    if (!this.lock && choice !== 'separateur' && choice !== 'separateur1') {
      let value;
      if (data[this.type] && data[this.type][choice]) {
        value = choice;
      } else if (this.choices.indexOf(choice) > -1) {
        value = choice;
      } else {
        value = null;
      }
      this.handleValue(value, !!value, true);
      this.handleChoices();
      if (value) {
        this.registerData(how);
        this.closeList();
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    } else if ((choice === 'separateur' || choice === 'separateur1') && event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  handleTouchMove() {
    this.move = true;
  }
  handleTouchEnd(choice) {
    if (!this.move) {
      this.handleClick(choice, 'touch');
    } else {
      this.move = false;
    }
  }
  handleClickSelect(event) {
    if (this.listShow) {
      this.closeList();
      event.preventDefault();
      event.stopPropagation();
    }
  }
  handleClickIcon(event) {
    if (this.listShow) {
      this.handleClickSelect(event);
    } else {
      this.elElem.nativeElement.focus();
    }
  }
  handleLock(lock) {
    this.lock = lock;
  }
  handleHoverIcon(state) {
    if (state) {
      this.iconHover = !!this.iconHoverContent;
    } else {
      this.iconHover = false;
    }
  }
  handleHoverBloc(state) {
    if (state) {
      const height = this.elElem.nativeElement.offsetHeight;
      this.topHoverBloc = height + 10;
      this.showHoverBloc = this.hoverBloc;
    } else {
      this.showHoverBloc = false;
    }
  }
  handleOptionsHeight() {
    if (this.elOptions) {
      const optionHeight = this.elOptions.nativeElement.clientHeight;
      this.sendOptionsHeight.emit(optionHeight + 25);
    } else {
      this.sendOptionsHeight.emit(168 + 25);
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
  handleScroll(event) {
    if (event && event.target) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      this.showFleche = scrollTop + clientHeight < scrollHeight && this.listShow;
    }
  }
}
