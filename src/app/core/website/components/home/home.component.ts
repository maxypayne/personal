import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-website-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteHomeComponent implements OnInit {
  cards = [
    {id: 'web', title: 'Web Development', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'design', title: 'UI/UX Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'sound', title: 'Sound Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'game', title: 'Game Design', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'adv', title: 'Advertising', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
    {id: 'photo', title: 'Photography', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus esse commodi deserunt vitae, vero quasi! Veniam quaerat tenetur pariatur doloribus.'},
  ];
  abilities = [
    'Connecter une API',
    'Développement back-end et front-end de sites et applications web.',
    'Compréhension des besoins utilisateurs et création d’un cahier des charges.',
    'Orchestration du déploiement d’applications via des outils de déploiement continu.',
    'Maintenance, correctif de bugs et amélioration des sites ou applications web.',
    'Intégration des APIS externes.',
    'Amélioration et ajout des nouveaux modules',
    'Développement des sites en version mobile',
    'Adaptabilité, capacité à travailler sur des sujets/univers divers.',
  ]
  constructor() { }
  ngOnInit(): void {
  }
}
