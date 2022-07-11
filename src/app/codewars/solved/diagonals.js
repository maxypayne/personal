const diagonals = (arr) => {
  const res = [];
  const length = arr.length;
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const long = row.length - 1;
    for (let j = 0; j < row.length; j++) {

    }
  }
}


diagonals( [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
] );

const data = [
  [1, 2, 3, 4, 5, 6],
  [6, 7, 8, 9, 1, 5],
  [2, 3, 4, 5, 6, 4],
  [7, 8, 9, 1, 2, 2],
  [3, 4, 5, 6, 7, 6],
  [3, 4, 5, 6, 7, 6],
]

// [ [ 1 ], [ 2, 4 ], [ 3, 5, 7 ], [ 6, 8 ], [ 9 ], [ 3 ], [ 2, 6 ], [ 1, 5, 9 ], [ 4, 8 ], [ 7 ] ]

const arr = [1,4,5,7,9,3,4,5,8,9,0,1,2,3,4,5,7,8,8];
const countTens = () => {
  const indx = [];
  for(let i = 0; i < arr.length; i++) {
    if (!indx.includes(i)) {
      for(let j = 0; j < arr.length; j++) {
        if (i + j === 10) {
          indx.push(i);
        }
      }
    }
  }
}


//Quand la famille s'agrandit, l'heureux événement peut s’accompagner d’un déménagement.
// Sur un plan purement pratique, il faut parfois trouver de l’espace supplémentaire, voire changer de maison ou d’appartement. Cela fait beaucoup de changements au sein du foyer, et mieux vaut se préparer dans les meilleures conditions.
// Pretto ne vous donnera pas de conseils parentaux mais vous explique comment appréhender un projet immobilier en période de grossesse. Peut-on emprunter quand on est enceinte ? Quelles incidences ce profil d'acheteur a-t-il sur le crédit immobilier ? Quel salaire sera pris en compte pour l'évaluation de votre demande ? Réponses dans cet article.
// La grossesse n'a que peu d'impact sur votre demande de prêt
// Tout d’abord, rassurez-vous : la banque ne va pas refuser de vous prêter de l’argent au seul motif que vous attendez un enfant. Cette situation ne vous empêchera pas non plus d'acheter seule.
// On peut tout à fait emprunter avant, pendant et après la grossesse.
// Il y a simplement quelques détails à connaître afin de bien présenter son dossier aux banques et vous aider à effectuer votre achat sans stress.
//
// Je simule ma emprunt
// La situation professionnelle est évaluée avant votre congé maternité
// La situation professionnelle qui sera prise en compte par l’établissement de crédit est celle d’avant le congé maternité.
// Important
// Attention cependant, la banque se base sur votre situation actuelle pour évaluer vos revenus. Ainsi, si vous faites votre demande de financement lorsque vous êtes en congé maternité, la banque se basera sur ces revenus pour le calcul du taux d'endettement.
// Il vaut donc mieux faire votre demande avant ou après cette période de congés.
// Je simule ma capacité d'emprunt
// C'est également le cas si vous êtes en congé parental au moment de contracter le prêt.
// Sans visibilité sur votre date de retour, la banque peut considérer que vos revenus du moment sont ceux à prendre en compte pour le calcul de l’emprunt. Un document justifiant la date de votre retour par l’employeur peut être demandé.
// Bon à savoir
// Il existe plusieurs prêts aidés, renseignez vous sur ces derniers afin d'optimiser votre projet. Notamment sur le Prêt Accession Social et sur le prêt conventionné.
// Calculez votre taux d'endettement
// Quel reste à vivre la banque prend-elle en compte ?
// Pas d’impact sur le taux d’endettement donc, si vous faites votre demande en dehors de la période de congés. En revanche, un enfant influera sur le calcul de votre reste à vivre.
// Le reste à vivre, c’est le montant qu’il vous reste une fois que vous vous êtes acquitté de vos mensualités et de vos charges récurrentes. Pour s’assurer de la soutenabilité du prêt, la banque vérifie que cette somme vous permet d’assurer votre niveau de vie.
// Sachez que la banque considère l'enfant à naître comme une part supplémentaire dans le foyer à partir du 3ème mois (c'est aussi le cas lorsque vous faites des demandes de prêt aidé par exemple, comme le PTZ).
// Avec un enfant supplémentaire à charge, elle estime qu’il vous faudra un montant supérieur pour subvenir à vos besoins. Ce coût additionnel se situe entre 300 € et 500 €, selon votre situation et votre banque.
// Exemple
// Vous êtes un jeune couple qui attend un heureux évènement (félicitations !). Selon le scénario le plus dur, la banque va vous demander un reste à vivre de 1 900 € (2 * 700 + 500).
// Dans un scénario un peu moins strict, la banque demandera un reste à vivre de 1 300 € (2 * 500 + 300).
// A noter, si vous ne bénéficiez pas d'un reste à vivre suffisant, la banque pourra refuser le financement même si vous êtes en dessous du taux d'endettement maximum à 35 %. Dans ce cas, deux possibilités :
// Vous pouvez allonger la durée du crédit afin de réduire le montant des mensualités et respecter les critères de la banque. Comparer les offres de crédit pour trouver celle qui vous correspond.
// Vous devez revoir votre projet afin de diminuer le prix du bien
// Grossesse et assurance de prêt immobilier
// Comme vu ci-dessus, la grossesse ne pose pas de réel obstacle auprès de la banque. Il faut cependant être plus vigilant avec la partie assurance de votre projet immobilier.
// Rien de particulier à déclarer si la grossesse est normale
// L’assurance emprunteur vous couvre en cas de défauts de paiement, liés par exemple à des soucis de santé. Elle est souvent rendue obligatoire par les banques prêteuses.
// Attention
// Dans certains cas, plutôt rares, l’assureur peut considérer qu’une grossesse est un facteur de risque aggravant et imposer une surprime à la signature.
// Ces cas ne sont pas courants mais pensez à vous renseigner avant de contractualiser pour éviter les mauvaises surprises.
// Si la grossesse se déroule normalement, sans complication, l’assureur n’intervient pas. Vous remboursez votre emprunt comme d’habitude.
// L’amour est dans le prêt
// Le podcast de Pretto
// En 2h30, en voiture, au bureau ou en faisant le ménage, peu importe vos préférences : vous serez bientôt un as du prêt immobilier
// Écouter
// cover Pretto
// Mais attention si la grossesse est pathologique
// Si votre grossesse est pathologique et que vous arrêtez de travailler pendant une durée plus longue que celle de votre congé maternité, l’assurance peut entrer en jeu.
// Pour information, le congé maternité court de six semaines avant la date prévue d’accouchement, à dix semaines après la naissance.
// Exemple
// Si vous êtes dans l’incapacité de travailler quatre mois avant la date du terme à cause de complications liées à votre grossesse, votre assurance pourra être activable (hors éventuel délai de carence initialement prévu lors de la souscription de votre contrat).
// Attention
// Cependant, la pathologie doit être médicalement documentée par un professionnel et les modalités de couverture varient d’une assurance à une autre.
// Quelle conséquence sur votre prêt si vous prenez un congé parental ?
// Il ne faut pas confondre congé maternité/paternité et congé parental.
// Lors du congé maternité (décrit plus haut) et du congé paternité (25 jours depuis 2020), le parent est indemnisé. La banque a une bonne visibilité sur la durée du congé et sur le niveau de revenus.
// Le saviez-vous ?
// A l’issue de cette période, le parent peut demander un congé supplémentaire.
// Il s’agit d’un congé sans solde : le congé parental. Sauf indemnisation particulière (CAF, MSA) ou dispositifs d’entreprise, l’emprunteur n’a plus de ressources régulières.
// La banque sera dans ce cas plus regardante sur votre situation personnelle. Elle demandera de la visibilité et des garanties sur la durée du congé et vos revenus prévisionnels.
// Dans tous les cas, pensez à communiquer avec votre banquier et votre assureur pour trouver les solutions les plus adaptées à votre cas.
