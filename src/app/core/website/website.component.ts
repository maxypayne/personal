import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './website.component.html',
  styleUrls: ['website.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class WebsiteComponent {
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
}
