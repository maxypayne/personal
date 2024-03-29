export default {
  quantite: {
    type: 'num',
    description: 'Quantité',
    placeholder: 'Quantité',
    length: 3,
    errorMessage: '',
  },
  search: {
    type: 'message',
    description: 'Tapez votre recherche...',
    placeholder: 'Tapez votre recherche...',
    length: 45,
    errorMessage: '',
  },
  login: {
    type: 'login',
    description: 'Entrez votre identifiant',
    length: 50,
  },
  email: {
    type: 'login',
    placeholder: 'E-mail',
    length: 50,
    errorMessage: 'Merci d’indiquer votre email pour le suivi de la commande.',
  },
  password: {
    type: 'mdp',
    placeholder: 'Entrez votre mot de passe',
    length: 30,
    errorMessage: 'Merci d\'indiquer votre mot de passe',
  },
  name: {
    type: 'textAz_firstMaj',
    placeholder: 'Nom',
    length: 40,
    errorMessage: 'Merci d’indiquer votre nom.',
  },
  nom: {
    type: 'textAz_firstMaj',
    description: 'Nom',
    length: 40,
    errorMessage: 'Merci d’indiquer votre nom.',
  },
  lastName: {
    type: 'textAz_firstMaj',
    description: 'Et votre nom ?',
    length: 40,
    errorMessage: 'Merci d’indiquer votre nom.',
  },
  prenom: {
    placeholder: 'Prénom',
    type: 'textAz_firstMaj',
    description: 'Prénom',
    length: 40,
    errorMessage: 'Merci d’indiquer votre prénom.',
  },
  cp: {
    type: 'cp',
    description: 'Code postal',
    length: 8,
    errorMessage: 'Merci d’indiquer votre code postal.',
  },
  codePostal: {
    type: 'cpFr',
    description: 'Code postal',
    inputType: 'tel',
    length: 5,
    errorMessage: 'Merci d’indiquer votre code postal.',
  },
  ville: {
    type: 'textAz_acc_firstMaj',
    description: 'Ville',
    length: 40,
    errorMessage: 'Merci d’indiquer votre ville.',
  },
  message: {
    type: 'message',
    description: 'Votre texte',
    length: 45,
    errorMessage: 'Merci d’indiquer votre texte personnalisé.',
  },
  tel: {
    type: 'telephone',
    description: 'Téléphone',
    inputType: 'tel',
    length: 20,
    errorMessage: 'Format incorrect',
  },
};
