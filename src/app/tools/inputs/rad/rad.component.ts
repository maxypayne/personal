import {
  Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter,
  Output, ViewEncapsulation, ViewChild, ElementRef, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import attrGlobal from './attr';
import data from './data';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-rad',
  templateUrl: './rad.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./rad.component.scss', 'imageGrayBack.scss']
})

export class RadComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('container', { static: true }) elContainer: ElementRef;
  @ViewChild('elemImg') elemImg: ElementRef;
  @Output() changeVal: EventEmitter<{ id: string, cleaned?: any, checked?: boolean, how?: string }> = new EventEmitter();
  @Output() clickSameVal: EventEmitter<null> = new EventEmitter();
  @Output() mEnter: EventEmitter<string> = new EventEmitter();
  @Output() mLeave: EventEmitter<null> = new EventEmitter();
  @Output() register: EventEmitter<{id: string, register: boolean, newData: boolean}> = new EventEmitter();
  @Input() clear: number;
  @Input() pushData: any;
  @Input() pushDataRegister: any;
  @Input() pushDataNoEmit: any;
  @Input() radAttr: {
    id: string,
    idToUpdate?: string,
    key?: string,
    type?: string,
    cssClass?: string,
    value?: string,
    verif?: boolean,
    lock?: boolean,
    curseur?: boolean,
    label?: string,
    labelHide?: boolean,
    labelNone?: boolean,
    labelShow?: boolean,
    role?: number,
    typePlaque?: string,
    formatImmat?: string,
    image?: boolean,
    list?: boolean,
    bonus?: boolean;
    initValue?: string,
    filterInfo?: {},
    error?: boolean,
    prixDatas?: {},
    personnalisationPrix?: boolean,
    hoverBloc?: boolean,
    roundedCheck?: boolean,
    subtitle?: {};
    priceOptions?: {};
    enableHover?: boolean;
    hideCheck?: boolean;
    radioType?: string;
  };
  desktop$: Subscription;
  desktop: boolean;
  id: string;
  idToUpdate: string;
  key: string;
  type: string;
  listOptions: {};
  priceOptions: {};
  nbr: any;
  cssClass = '';
  value: string;
  verif: boolean;
  lock: boolean;
  curseur: boolean;
  label: string;
  label2: string;
  labelHide: boolean;
  labelNone: boolean;
  labelShow: boolean;
  hasErr: boolean;
  image: boolean;
  bonus: boolean;
  initValue: string;
  newData: {id: string, cleaned?: any, checked?: boolean, how?: string};
  active: string;
  choices: string[] = [];
  list: boolean;
  role: number;
  typePlaque: string;
  formatImmat: string;
  filterInfo: {};
  prixDatas: {};
  descriptionMobile: string;
  subtitle: {};
  toolTipMobile: string;
  dimensions: {};
  personnalisationPrix: boolean;
  hoverBloc: boolean;
  roundedCheck: boolean;
  hoverBlocText: string;
  showHover: boolean;
  choixOption: string;
  hoverText = {};
  enableHover: boolean;
  radioType: string;
  errorMessage: string;
  hideCheck: boolean;
  formatWebp: boolean;
  centerErreurs = ['etatVehicule', 'demarche'];
  constructor(private app: AppService) {
    this.desktop = this.app.desktopInit;
    this.desktop$ = this.app.desktop.subscribe(state => this.desktop = state);
    this.formatWebp = app.formatWebp;
  }
  ngOnDestroy() {
    this.desktop$.unsubscribe();
  }
  ngOnInit() {
    if (this.radAttr && !this.id) {
      this.handleAttr('init');
    }
  }
  handleAttr(how) {
    const {
      id, idToUpdate, key, cssClass, value, verif, lock, curseur, labelHide, labelNone, image, list, bonus, prixDatas,
      personnalisationPrix, hoverBloc, label, role, filterInfo, typePlaque, formatImmat, subtitle, priceOptions, roundedCheck,
      enableHover, radioType, labelShow, hideCheck,
    } = this.radAttr;
    if (id && attrGlobal[id]) {
      const {
        type, nbr, label: labelAttr, label2, descriptionMobile, toolTipMobile, dimensionsOptions, hoverBlocText, errorMessage,
      } = attrGlobal[id];
      this.id = id;
      this.idToUpdate = idToUpdate;
      this.key = key;
      this.cssClass = cssClass || '';
      this.verif = verif;
      this.lock = lock;
      this.curseur = curseur;
      this.labelHide = labelHide;
      this.labelNone = labelNone;
      this.labelShow = labelShow;
      this.image = image;
      this.list = list;
      this.bonus = bonus;
      this.prixDatas = prixDatas;
      this.personnalisationPrix = personnalisationPrix;
      this.hoverBloc = hoverBloc;
      this.label = label || labelAttr || null;
      this.role = role;
      this.typePlaque = typePlaque;
      this.formatImmat = formatImmat;
      this.type = type;
      this.nbr = nbr;
      this.label2 = label2 || null;
      this.descriptionMobile = descriptionMobile || null;
      this.toolTipMobile = toolTipMobile || null;
      this.dimensions = dimensionsOptions || null;
      this.hoverBlocText = hoverBlocText;
      this.subtitle = subtitle;
      this.roundedCheck = roundedCheck;
      this.enableHover = enableHover;
      this.radioType = radioType || 'default';
      this.errorMessage = errorMessage;
      this.hideCheck = hideCheck;
      if (how === 'pushData') {
        this.value = this.pushData;
      } else if (how === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
      } else {
        this.value = value || null;
      }
      this.handleChoices(attrGlobal[id], role, filterInfo);
      if (this.value) {
        this.handleClick(this.value, how === 'pushData' || how === 'pushDataRegister');
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.radAttr) {
      const { idToUpdate, key, initValue, role, filterInfo, error, prixDatas, typePlaque, formatImmat } = this.radAttr;
      this.idToUpdate = idToUpdate;
      this.key = key;
      if (filterInfo) {
        this.filterInfo = filterInfo;
        this.handleChoices(attrGlobal[this.id], role, filterInfo);
      }
      if (initValue) {
        this.initValue = initValue;
        this.handleClick(initValue, false);
      }
      if (error !== undefined) {
        this.hasErr = error;
      }
      if (prixDatas) {
        this.prixDatas = prixDatas;
      }
      if (typePlaque) {
        this.typePlaque = typePlaque;
      }
      if (formatImmat) {
        this.formatImmat = formatImmat;
      }
    }
    if (changes.pushData && this.pushData && this.pushData !== this.active) {
      this.handlePushData('pushData');
    }
    if (changes.pushDataRegister && this.pushDataRegister) {
      this.handlePushData('pushDataRegister');
    }
    if (changes.pushDataNoEmit && this.pushDataNoEmit && this.pushDataNoEmit !== this.active) {
      this.handlePushData('pushDataNoEmit');
    }
    if (changes.clear && this.clear) {
      this.handleClear();
    }
  }
  handlePushData(which) {
    if (!this.id) {
      this.id = this.radAttr.id;
      this.handleAttr(which);
    } else {
      if (which === 'pushData') {
        this.value = this.pushData;
      } else if (which === 'pushDataRegister') {
        this.value = this.pushDataRegister;
      } else if (which === 'pushDataNoEmit') {
        this.value = this.pushDataNoEmit;
      }
      this.handleChoices(attrGlobal[this.id], this.role, this.filterInfo);
      this.handleClick(this.value, which !== 'pushDataNoEmit');
    }
  }
  handleClear() {
    this.newData = {id: this.type, cleaned: null, checked: false};
    this.active = null;
    this.hasErr = false;
  }
  handleChoices(attr, role, filterInfo) {
    if (this.curseur) {
      this.active = this.value;
    } else if (attr) {
      const { listOptions, priceOptions } = attr;
      this.listOptions = filterInfo || listOptions;
      this.priceOptions = priceOptions || null;
      if (this.listOptions) {
        this.choices = Object.keys(this.listOptions);
      }
    }
  }
  handleClick(choice, emit, e?, isLock?) {
    if (!isLock) {
      if (e && e.target.className === 'showPhoto' && this.desktop) {
        this.showPopup(choice);
      } else {
        if (this.active !== choice) {
          let type = this.filterInfo && this.filterInfo['formatPl'] ? this.type + '_' + this.filterInfo['formatPl'] : this.type;
          let options;
          if (!type) {
            type = attrGlobal[this.id] ? attrGlobal[this.id].type : null;
            this.type = type;
          }
          if (this.id === 'materiau') {
            options = this.listOptions ? this.listOptions : data['materiau']['siv']['auto'];
          } else {
            options = data[type] || this.listOptions;
          }
          if (options && options[choice]) {
            this.newData = {id: this.type, cleaned: choice, checked: true};
            this.active = choice;
            if (emit) {
              this.registerData('click');
            }
          } else {
            this.newData = {id: this.type, cleaned: null, checked: false};
            this.active = null;
            this.hasErr = false;
          }
          if (emit) {
            this.changeVal.emit(this.newData);
          }
          this.hasErr = false;
        } else {
          this.clickSameVal.emit();
        }
      }
    }
  }
  handleMouse(state, choice?) {
    if (this.radioType === 'image' ||  this.radioType === 'imageGrayBack') {
      this.showHover = state;
      this.choixOption = choice;
    } else {
      // for non image radio
    }
    if (state) {
      this.mEnter.emit(choice);
    } else {
      this.mLeave.emit();
    }
  }
  showPopup(choice) {
    this.app.popupInfos.next({
      state: true, id: 'showPlaquePhoto', infos: { typePlaque: this.typePlaque, formatImmat: this.formatImmat, choice }
    });
  }
  toggleCurseur() {
    if (!this.lock) {
      this.active = this.active === 'O' ? 'N' : 'O';
      this.newData = {id: this.id, cleaned: this.active, checked: true};
      this.verif = false;
      this.changeVal.emit(this.newData);
    }
  }
  registerData(how: string) {
    if (this.newData && this.idToUpdate && this.key) {
      this.app.api('post', '/update/input', {id: this.idToUpdate, key: this.key, value: this.newData.cleaned, how})
        .then(() => this.register.emit( { id: this.id, register: true, newData: true }))
        .catch(() => {
          this.register.emit({ id: this.id, register: false, newData: false });
          this.newData = {id: this.id, cleaned: null, checked: false};
          this.active = null;
          this.hasErr = true;
        });
    } else {
      this.register.emit({ id: this.id, register: true, newData: false });
    }
  }
}
