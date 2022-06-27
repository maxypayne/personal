import { Component, ElementRef, ViewChild } from "@angular/core";
import { AppService } from "../../app.service";
import * as ace from "ace-builds";

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.scss']
})

export class PortfolioComponent {
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  links = [
    { id: 'home', text: 'Accueil'},
    {id: 'about', text: 'À propos'},
    // {id: 'experience', text: 'Experiences'},
    // {id: 'codewars', text: 'Codewars'},
    {id: 'projects', text: 'Projets'},
    {id: 'contact', text: 'Contact'},
  ];
  skills = [
    {id: 'js', text: 'JavaScript'},
    {id: 'ts', text: 'TypeScript'},
    {id: 'angular', text: 'Angular'},
    {id: 'react', text: 'React'},
    {id: 'node', text: 'Nodejs'},
    {id: 'mongo', text: 'MongoDB'},
    {id: 'elastic', text: 'ElasticSearch'},
    {id: 'webpack', text: 'Webpack'},
  ]
  projects = [
    { id: 'app', link: 'https://app.eplaque.fr', languages: ['HTML', 'SCSS', 'Angular'], title: 'Eplaque B2C', description: 'Application web qui permet aux particuliers de faire leurs démarches d\'immatriculation et les plaques + suivi de chaque etape de debut a la fin'},
    { id: 'bo', title: 'Back office', languages: ['HTML', 'SCSS', 'Angular'], description: 'Application web qui permet la gestion des dossier pour les client'},
    { id: 'b2b', title: 'Plateforme B2B', languages: ['HTML', 'SCSS', 'Angular'], description: 'Plateforme web qui permet aux pro de gerer leur flotte des véhicules'},
    { id: 'api', title: 'Api doc', languages: ['HTML', 'SCSS', 'Angular'],  description: 'Documentation api'},
    { id: 'pro', title: 'Formulaire pro', link: 'https://app.eplaque.fr', languages: ['HTML', 'SCSS', 'Angular'], description: 'Application qui permet aux pros d\'ouvrir un compte'},
  ];
  data = {};
  check = {};
  fields = ['nom', 'email', 'message'];
  btn: boolean;
  error: string;
  constructor(private app: AppService) {}
  handleChange(action) {
    const { id, cleaned, checked } = action;
    this.data[id] = cleaned;
    this.check[id] = checked;
  }
  chckBtn() {
    this.btn = this.fields.every(x => this.check[x]);
  }
  async sendMessage() {
    this.error = null;
    const sent = await this.app.post('send/email', this.data).subscribe(data => { console.log(data)});
    console.log({sent})
    if (sent) {
      console.log('ok')
    } else {
      this.error = 'this is an error'
    }
  }

  ngAfterViewInit(): void {
    // if (this.editor) {
    //   ace.config.set("fontSize", "14px");
    //   ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    //   const aceEditor = ace.edit(this.editor.nativeElement);
    //   aceEditor.session.setValue(`
    //   const query = () => {
    //   let sortFunction, selectFunc, addWhereFunc;
    //   let data, whereFuncs, havingFuncs, groupByFuncs = [];
    //   const counts = {};
    //   return  {
    //     select(fn) {
    //       if (counts.select) { throw new Error('Duplicate SELECT') }
    //       selectFunc = fn;
    //       counts.select = true;
    //       return this;
    //     },
    //     from(f, s) {
    //       if (counts.from) { throw new Error('Duplicate FROM') }
    //       data = f.reduce((a, x ) => [...a, ...s ? s.reduce((b, y) => [...b, [x, y]], []) : [x]], []);
    //       counts.from = true;
    //       return this;
    //     },
    //
    //     where(...funcs) {
    //       if (!whereFuncs.length) {
    //         whereFuncs = funcs;
    //       } else {
    //         addWhereFunc = funcs[0];
    //       }
    //       return this;
    //     },
    //     orderBy(toOrder) {
    //       if (counts.orderBy) { throw new Error('Duplicate ORDERBY') }
    //       sortFunction = toOrder;
    //       counts.orderBy = true;
    //       return this;
    //     },
    //     groupBy(...funcs) {
    //       if (counts.groupBy) { throw new Error('Duplicate GROUPBY') }
    //       groupByFuncs = funcs;
    //       counts.groupBy = true;
    //       return this;
    //     },
    //     having(fn) {
    //       havingFuncs = [...havingFuncs, fn];
    //       return this;
    //     },
    //     execute() {
    //       if ((whereFuncs || []).length) {
    //         data = whereFuncs.reduce((acc, fn) => [...acc, ...data.filter(fn)], []);
    //         if (addWhereFunc) {
    //           data = data.filter(addWhereFunc);
    //         }
    //       }
    //       if ((groupByFuncs || []).length) {
    //         const recursive = (arr, fns) => {
    //           if (!fns.length) return arr;
    //           const fn = fns.shift();
    //           return Object.entries(arr.reduce((acc, el) => ({...acc, [fn(el)]: [...acc[fn(el)] || [], el]}), {}))
    //             .map(x => [ +x[0] || x[0], recursive(x[1], fns.slice()) ]);
    //         }
    //         data = recursive(data, groupByFuncs);
    //       }
    //       if ((havingFuncs || []).length) {
    //         data = data.filter(x => havingFuncs.every(y => y(x)));
    //       }
    //       if (selectFunc) {
    //         data = data.map(selectFunc);
    //       }
    //       if (sortFunction) {
    //         data = data.sort(sortFunction);
    //       }
    //       return data;
    //     },
    //   };
    // };
    // `);
    //   aceEditor.setTheme('ace/theme/dracula');
    //   aceEditor.session.setMode('ace/mode/javascript');
    // }
  }
}


//Maintenance
// Un site internet en bonne santé est un site internet mis à jour.
// Les forfaits de maintenance proposés sont le fruits d’années d’expérience et des solutions apportées à mes clients afin de vous garantir un site internet performant et fiable.
