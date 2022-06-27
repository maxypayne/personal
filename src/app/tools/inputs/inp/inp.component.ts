import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges,
  OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import attrGlobal from './attr';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-inp',
  templateUrl: './inp.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inp.component.scss']
})

export class InpComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) elContainer!: ElementRef;
  @ViewChild('inputElem', { static: true }) elInput!: ElementRef;
  @Output() changeVal: EventEmitter<{id: string, cleaned?: any, checked?: boolean, how?: string, suggested?: string}> = new EventEmitter();
  @Output() enter: EventEmitter<null> = new EventEmitter();
  @Output() esc: EventEmitter<null> = new EventEmitter();
  @Output() tab: EventEmitter<null> = new EventEmitter();
  @Output() focusEmit: EventEmitter<{showError?: boolean}> = new EventEmitter();
  @Output() blurEmit: EventEmitter<{showError?: boolean}> = new EventEmitter();
  @Output() iconEmit: EventEmitter<null> = new EventEmitter();
  @Output() register: EventEmitter<{id: string, register: boolean, newData: boolean}> = new EventEmitter();
  @Input() clear: number;
  @Input() pushData: any;
  @Input() pushDataRegister: any;
  @Input() pushDataNoEmit: any;
  @Input() inpAttr: {
    id: string,
    idToUpdate?: string,
    key?: string,
    type?: string,
    cssClass?: string,
    background?: string,
    description?: string,
    info?: string,
    exemple?: string,
    value?: any,
    verif?: boolean,
    optionnel?: boolean,
    lock?: boolean,
    focus?: number,
    focusSelect?: boolean,
    labelHide?: boolean,
    labelNone?: boolean,
    eraseOnClick?: boolean,
    accent?: boolean,
    length?: number,
    min?: number,
    max?: number,
    icon?: string,
    iconHoverContent?: string,
    initValue?: string,
    error?: boolean,
    showVerifLabel?: boolean,
    showRepere?: boolean,
    noRegisterOnBlur?: boolean,
    noAutoComplete?: boolean,
    hoverBloc?: boolean,
    last?: boolean,
    hideError?: boolean,
    etatVehicule?: string,
    otherErrorMessage?: string,
    placeholder?: string,
  } = { id: null };
  desktopSub: Subscription;
  id: string;
  idToUpdate: string;
  key: string;
  type: string;
  cssClass: string;
  background: string;
  description: string;
  info: string;
  exemple: string;
  value: any;
  cleanedReform: string;
  verif: boolean;
  optionnel: boolean;
  lock: boolean;
  focus: number;
  labelHide: boolean;
  labelNone: boolean;
  eraseOnClick: boolean;
  length: number;
  min: number;
  max: number;
  icon: string;
  iconHover: boolean;
  iconHoverContent: string;
  initValue: string;
  showVerifLabel: boolean;
  showRepere: boolean;
  repere: string;
  noRegisterOnBlur: boolean;
  hoverBloc: boolean;
  last: boolean;
  hideError: boolean;
  hasErr: boolean;
  showEx: boolean;
  newData: string;
  msgErreur: string;
  focusData: string;
  data: string;
  inputType: string;
  autocomplete: string;
  elem: any;
  desktop: boolean;
  active: boolean;
  verifLabel: boolean;
  fakeTrue: boolean;
  showHoverBloc: boolean;
  topHoverBloc: boolean;
  hoverBlocText: string;
  suggestedShow: boolean;
  suggested: string;
  errorMessage: string;
  labelTop: boolean;
  etatVehicule: string;
  placeholder: string;
  showError: boolean;
  constructor(
    private renderer: Renderer2,
    private app: AppService,
  ) {
    this.desktop = app.desktopInit;
    this.desktopSub = app.desktop.subscribe(desktop => this.desktop = desktop);
  }
  ngOnDestroy() {
    this.desktopSub.unsubscribe();
  }
  @HostListener('document:paste', ['$event'])
  onPaste(event: any) {
    if (this.id) {
      event.stopPropagation();
      event.preventDefault();
      if (event.target.id === this.id) {
        const data = event.clipboardData.getData('Text');
        this.checkData(data, 'paste');
      }
    }
  }
  ngOnInit() {
    if (this.inpAttr && !this.id) {
      this.handleAttr('init');
    }
  }
  ngAfterViewInit() {
    if (!this.elem) {
      this.handleNativeElement(this.pushData ? 'pushData' : 'afterViewInit');
    }
  }
  handleAttr(how: string) {
    const {
      id, idToUpdate, key, cssClass, background, value, optionnel, lock, focus, labelHide, labelNone, eraseOnClick,
      description, exemple, icon, iconHoverContent, showVerifLabel, noRegisterOnBlur, noAutoComplete, hoverBloc, accent, last,
      showRepere, etatVehicule, otherErrorMessage, hideError,
    } = this.inpAttr;
    const attr = accent ? id + 'Acc' : id;
    if (attr && attrGlobal[attr]) {
      const {
        type, description: descriptionAttr, exemple: exempleAttr, info, length, min, max, autocomplete, inputType,
        hoverBlocText, errorMessage, placeholder, repere,
      } = attrGlobal[attr];
      this.id = id;
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.cssClass = cssClass || '';
      this.background = background || '';
      this.value = value || null;
      this.optionnel = optionnel;
      this.lock = lock;
      this.focus = focus;
      this.labelHide = labelHide;
      this.labelNone = labelNone;
      this.eraseOnClick = eraseOnClick;
      this.description = description || descriptionAttr;
      this.exemple = exemple || exempleAttr;
      this.icon = icon;
      this.iconHoverContent = iconHoverContent || null;
      this.showVerifLabel = showVerifLabel;
      this.showRepere = showRepere;
      this.repere = repere;
      this.noRegisterOnBlur = noRegisterOnBlur;
      this.autocomplete = noAutoComplete ? 'off' : autocomplete || 'off';
      this.hoverBloc = hoverBloc;
      this.last = last;
      this.hideError = hideError;
      this.type = type;
      this.info = info;
      this.length = length || 50;
      this.min = min;
      this.max = max;
      this.inputType = this.type === 'mdp' ? 'password' : inputType || 'text';
      this.hoverBlocText = hoverBlocText;
      this.showEx = true;
      this.errorMessage = otherErrorMessage || errorMessage;
      this.etatVehicule = etatVehicule;
      this.placeholder = placeholder;
      if (how === 'init') {
        if (value) {
          this.handleInitValue(value, false);
        }
        if (optionnel) {
          this.handleOptionnel();
        }
      }
    }
  }
  handleNativeElement(how: string) {
    this.elem = this.elInput ? this.elInput.nativeElement : null;
    if (how === 'pushData' || how === 'pushDataNoEmit' || how === 'pushDataRegister') {
      let value;
      if (how === 'pushData') {
        value = this.pushData;
      } else if (how === 'pushDataNoEmit') {
        value = this.pushDataNoEmit;
      } else if (how === 'pushDataRegister') {
        value = this.pushDataRegister;
      }
      this.checkData(value, '', how);
    }
    if (this.elem && this.focus && !this.lock) {
      setTimeout(() => this.elem.focus());
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.inpAttr) {
      const {
        idToUpdate, key, focus, focusSelect, lock, icon, initValue, error, description, noRegisterOnBlur, etatVehicule,
      } = this.inpAttr;
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.focus = focus;
      this.icon = icon;
      this.handleLock(lock);
      if (description) {
        this.description = description;
      }
      if (initValue !== undefined && this.initValue !== null && !this.fakeTrue && initValue !== this.pushData) {
        this.handleInitValue(initValue, false);
      }
      if (this.focus && this.elem) {
        this.elem.focus();
      }
      if (focusSelect && this.elem) {
        this.elem.focus();
        this.elem.select();
      }
      if (error !== undefined) {
        this.hasErr = error;
        this.showError = !!error;
      }
      if (noRegisterOnBlur !== undefined) {
        this.noRegisterOnBlur = noRegisterOnBlur;
      }
      if (etatVehicule) {
        this.etatVehicule = etatVehicule || 'O';
      }
    }
    if (changes.pushData && this.pushData && (this.pushData !== this.newData || this.hasErr)) {
      this.handlePushData('pushData');
    }
    if (changes.pushDataRegister && this.pushDataRegister && (this.pushDataRegister !== this.newData || this.hasErr)) {
      this.handlePushData('pushDataRegister');
    }
    if (changes.pushDataNoEmit && this.pushDataNoEmit && (this.pushDataNoEmit !== this.newData || this.hasErr)) {
      this.handlePushData('pushDataNoEmit');
    }
    if (changes.clear && changes.clear.currentValue !== this.clear) {
      this.handleClear();
    }
  }
  handlePushData(which: string) {
    if (!this.id) {
      this.id = this.inpAttr.id;
      this.handleAttr(which);
    }
    this.focusData = null;
    this.handleNativeElement(which);
  }
  checkData(value: string, key: string, how?: any) {
    // const isCheck = check.checkData(value, this.type, this.optionnel, this.min, this.max, key);
    // if (isCheck) {
      // const { status, cleaned, cleanedReform, suggested, error } = isCheck;
      // if (status) {
      this.verif = false;
      this.fakeTrue = false;
      // this.cleanedReform = cleanedReform;
      // this.suggested = suggested;
      this.handleValue(value, true, null, how !== 'pushDataNoEmit');
      if (how === 'pushData' || how === 'pushDataNoEmit' || how === 'pushDataRegister' || how === 'paste') {
        this.newData = value;
        if (how === 'paste' || how === 'pushDataRegister') {
          this.registerData(how);
        }
      }
      // } else if (cleaned && cleaned !== '@@@' && cleaned !== 'empty') {
      //   this.fakeTrue = true;
      //   this.suggested = null;
      //   this.handleValue(cleaned, false, error, how !== 'pushDataNoEmit');
      // } else {
      //   this.fakeTrue = false;
      //   this.suggested = null;
      //   this.handleValue(null, false, error, how !== 'pushDataNoEmit');
      // }
    // }
  }
  handleClear() {
    this.handleElem(null);
    this.data = null;
    this.newData = null;
    this.hasErr = false;
  }
  handleInitValue(value: string, emit: boolean) {
    this.initValue = value;
    this.handleValue(value, value !== undefined && value !== null, null, emit);
  }
  handleOptionnel() {
    // this.changeVal.emit({id: this.id, cleaned: this.initValue || null, checked: true});
  }
  handleValue(cleaned: string, checked: boolean, error: string, emit: boolean) {
    if (cleaned || checked) {
      this.data = cleaned;
    } else {
      this.msgErreur = error;
    }
    if (this.showVerifLabel) {
      this.verifLabel = checked;
    }
    this.hasErr = !checked;
    if (this.hasErr) {
      this.pushDataRegister = null;
    }
    this.showEx = !cleaned;
    this.handleElem(cleaned);
    if (emit) {
      this.changeVal.emit({id: this.id, checked, cleaned: cleaned || null, suggested: this.suggested });
    }
  }
  handleElem(cleaned: string) {
    if (this.elem) {
      this.elem.value = cleaned || null;
      this.renderer.setAttribute(this.elem, 'cleanedData', cleaned || '');
      this.renderer.setAttribute(this.elem, 'statusData', 'true');
    }
  }
  handleKeyup(event: KeyboardEvent) {
    const keyGhost = [
      'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft',
      'Escape', 'Enter', 'Alt', 'Tab', 'Shift', 'CapsLock', 'Control', 'Meta',
      'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    ];
    if (this.elem && keyGhost.indexOf(event.key) === -1) {
      this.checkData(this.elem.value, event.key);
    }
  }
  handleKeydown(event: KeyboardEvent) {
    if (this.elem && event.key === 'Enter') {
      this.showEx = this.eraseOnClick || !this.data;
      this.renderer.setAttribute(this.elem, 'keyBlur', 'enter');
      this.registerData('enter');
      this.elem.blur();
      this.enter.emit();
    }
    if (event.key === 'Tab') {
      if (this.last) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.handleData();
      this.tab.emit();
    }
    if (event.key === 'Escape') {
      this.esc.emit();
    }
  }
  handleFocus() {
    if (!this.lock) {
      if (!this.desktop) {
        this.handleHoverBloc(true);
      }
      this.focusEmit.emit({ showError: false });
      this.active = true;
      if (this.elem && this.eraseOnClick) {
        this.elem.value = null;
        this.renderer.setAttribute(this.elem, 'cleanedData', '');
        this.renderer.setAttribute(this.elem, 'statusData', 'false');
        this.newData = null;
      } else {
        this.focusData = this.elem.value || null;
      }
      this.labelTop = true;
      this.showError = false;
    }
  }
  handleBlur() {
    if (!this.lock) {
      if (!this.desktop) {
        this.handleHoverBloc(false);
      }
      this.blurEmit.emit({ showError: this.hasErr });
      this.active = false;
      this.handleData();
      if (!this.noRegisterOnBlur) {
        this.registerData('blur');
      }
      this.suggestedShow = !!this.suggested;
      this.labelTop = !!this.value;
      this.showError = true;
    }
  }
  handleData() {
    this.newData = this.elem.getAttribute('cleanedData');
    if (this.elem.getAttribute('statusData') === 'true') {
      this.elem.value = this.newData !== 'null' ? this.newData : null;
    }
    if (this.elem.getAttribute('keyBlur') === 'enter') {
      this.renderer.removeAttribute(this.elem, 'keyBlur');
    } else {
      this.showEx = this.eraseOnClick || !this.data;
    }
  }
  handleLock(lock: boolean) {
    this.lock = lock;
    if (this.lock) {
      this.icon = 'right';
    }
  }
  handleHoverIcon(state: boolean) {
    if (state) {
      this.iconHover = !!this.iconHoverContent;
    } else {
      this.iconHover = false;
    }
  }
  handleHoverBloc(state: boolean) {
    if (state) {
      const height = this.elInput.nativeElement.offsetHeight;
      this.topHoverBloc = height + 10;
      this.showHoverBloc = this.hoverBloc;
    } else {
      this.showHoverBloc = false;
    }
  }
  registerData(how: string) {
    if (this.idToUpdate && this.key && (this.newData || this.optionnel) && this.newData !== this.focusData && !this.fakeTrue) {
      const cleaned = this.cleanedReform ? this.cleanedReform.trim() : (this.newData as string).trim();
      let value;
      if (this.type === 'date') {
        if (cleaned === '01/01/1970') {
          value = 1000;
        } else {
          const split = cleaned ? cleaned.split('/') : null;
          value = cleaned && split && split.length > 0 ? Date.parse(`${split[2]}-${split[1]}-${split[0]}`) : null;
        }
      } else if (this.type === 'immat') {
        value = cleaned.replace(/[ -]+/g, '');
      } else if (this.type === 'telephone') {
        value = cleaned.replace(/[ ]+/g, '');
      } else {
        value = cleaned;
      }
      this.app.api('post', '/update/input', {id: this.idToUpdate, key: this.key, value, how})
        .then(() => this.register.emit( { id: this.id, register: true, newData: true }))
        .catch((err) => {
          if (err) {
            this.register.emit({ id: this.id, register: false, newData: false });
            this.handleValue(null, false, 'Une erreur est survenue', false);
          }
        });
    } else {
      this.register.emit({ id: this.id, register: true, newData: false });
    }
  }
  clickIcon(how?: any) {
    if (how === 'clean') {
      this.handleValue(null, true, null, true);
    }
    this.iconEmit.emit();
  }
}
