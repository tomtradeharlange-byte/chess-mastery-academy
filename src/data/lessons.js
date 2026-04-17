// Toutes les leçons de l'application
// Chaque leçon a : id, meta, contenu théorique, notation des coups, position du board

export const LESSONS = {
  sicilienne: {
    id: 'sicilienne',
    tag: 'Ouverture',
    badge: 'Agressif',
    badgeColor: '#073002',
    title: 'La Défense Sicilienne',
    subtitle: 'Volume IV : Najdorf & Dragon',
    accuracy: '94.2%',
    boardPosition: 'sicilienne',
    moves: [
      { num: 1, w: 'e4',  b: 'c5'   },
      { num: 2, w: 'Cf3', b: 'd6'   },
      { num: 3, w: 'd4',  b: 'cxd4' },
      { num: 4, w: 'Cxd4',b: 'Cf6'  },
      { num: 5, w: 'Cc3', b: 'a6'   },
    ],
    content: [
      {
        title: 'La réponse la plus combative',
        body: "La Défense Sicilienne (1.e4 c5) est la réponse la plus populaire et la mieux notée face à 1.e4. Les Noirs créent immédiatement une asymétrie de pions pour générer un jeu déséquilibré.",
      },
      {
        title: 'Philosophie stratégique',
        body: "Au lieu de contester le centre directement avec 1...e5, les Noirs contrôlent d4 depuis le flanc. Cette approche évite l'échange symétrique et prépare un contre-jeu actif sur l'aile dame.",
      },
      {
        title: 'La Variante Najdorf (5...a6)',
        body: "Le coup 5...a6 — le Najdorf — est la variante la plus jouée aux plus hauts niveaux. Il prévient Fb5+ et prépare b5 pour un contre-jeu immédiat. Kasparov et Fischer en furent les champions.",
      },
    ],
  },

  gambit_dame: {
    id: 'gambit_dame',
    tag: 'Ouverture',
    badge: 'Positionnel',
    badgeColor: '#4e453e',
    title: 'Le Gambit de la Dame',
    subtitle: 'La maîtrise du centre',
    accuracy: '91.0%',
    boardPosition: 'gambit_dame',
    moves: [
      { num: 1, w: 'd4',  b: 'd5'  },
      { num: 2, w: 'c4',  b: 'e6'  },
      { num: 3, w: 'Cc3', b: 'Cf6' },
      { num: 4, w: 'Fg5', b: 'Fe7' },
      { num: 5, w: 'e3',  b: '0-0' },
    ],
    content: [
      {
        title: 'Un gambit qui n\'en est pas un',
        body: "Le Gambit de la Dame (1.d4 d5 2.c4) est l\'une des ouvertures les plus respectées. Les Blancs offrent le pion c4, mais après 2...dxc4 ils le récupèrent facilement — c\'est plus une invitation positionnnelle qu\'un vrai sacrifice.",
      },
      {
        title: 'La bataille du centre',
        body: "L\'objectif principal des Blancs est d\'établir un pion central fort avec e4. Les Noirs doivent décider : accepter le gambit (GDA), le refuser (GDR), ou jouer la Slave pour défendre d5 différemment.",
      },
      {
        title: 'Variante principale : Gambit Refusé',
        body: "Après 2...e6, les Noirs renforcent d5 et gardent une structure solide. La partie évolue vers un milieu de jeu positionnel où la compréhension des structures de pions est décisive.",
      },
    ],
  },

  defense_francaise: {
    id: 'defense_francaise',
    tag: 'Ouverture',
    badge: 'Résilient',
    badgeColor: '#564334',
    title: 'La Défense Française',
    subtitle: 'Solidité et contre-jeu',
    accuracy: '89.5%',
    boardPosition: 'defense_francaise',
    moves: [
      { num: 1, w: 'e4',  b: 'e6'  },
      { num: 2, w: 'd4',  b: 'd5'  },
      { num: 3, w: 'Cc3', b: 'Ff4' },
      { num: 4, w: 'e5',  b: 'c5'  },
      { num: 5, w: 'a3',  b: 'Cc6' },
    ],
    content: [
      {
        title: 'Une forteresse dynamique',
        body: "La Défense Française (1.e4 e6) crée immédiatement un pion en chaîne après 2.d4 d5. Les Noirs abandonnent temporairement l\'espace mais obtiennent une structure solide pour un contre-jeu tardif.",
      },
      {
        title: 'La chaîne de pions',
        body: "La tension centrale autour de e4-d5 est le cœur de la Française. Les Blancs défendent e4 et avancent en e5 pour attaquer l\'aile roi. Les Noirs contre-attaquent avec c5 contre la chaîne de pions blancs.",
      },
      {
        title: 'Tactique clé : l\'attaque de la chaîne',
        body: "La règle fondamentale : attaquer la base de la chaîne de pions adverse. Les Noirs visent d4 avec c5, les Blancs visent f7 avec l\'avance e5-f4-f5. La partie est souvent tranchante malgré une apparence solide.",
      },
    ],
  },

  stafford: {
    id: 'stafford',
    tag: 'Ouverture',
    badge: 'Dynamique',
    badgeColor: '#073002',
    title: 'Gambit Stafford',
    subtitle: 'Théorie Avancée · Vol. I',
    accuracy: '98.4%',
    boardPosition: 'stafford',
    moves: [
      { num: 1, w: 'e4',   b: 'e5'   },
      { num: 2, w: 'Cf3',  b: 'Cf6'  },
      { num: 3, w: 'Cxe5', b: 'd6'   },
      { num: 4, w: 'Cf3',  b: 'Cxe4' },
      { num: 5, w: 'd3',   b: '…'    },
    ],
    content: [
      {
        title: 'Principe fondamental',
        body: "Le Gambit Stafford commence par 1.e4 e5 2.Cf3 Cf6, offrant un pion pour un développement rapide et des pièges tactiques redoutables contre les Blancs imprudents.",
      },
      {
        title: 'La psychologie du sacrifice',
        body: "Les Noirs créent des déséquilibres intentionnels. Le but n\'est pas la récupération du pion, mais l\'initiative et la confusion chez l\'adversaire qui joue d\'instinct.",
      },
      {
        title: 'Variante principale',
        body: "Après 3.Cxe5 d6 4.Cf3 Cxe4, les Noirs récupèrent le pion avec un excellent développement. La partie s\'oriente vers un milieu de jeu tactique très favorable aux Noirs.",
      },
    ],
  },

  systeme_londres: {
    id: 'systeme_londres',
    tag: 'Ouverture',
    badge: 'Solide',
    badgeColor: '#4e453e',
    title: 'Système de Londres',
    subtitle: 'Développement fiable des Blancs',
    accuracy: '87.3%',
    boardPosition: 'systeme_londres',
    moves: [
      { num: 1, w: 'd4',  b: 'd5'  },
      { num: 2, w: 'Cf3', b: 'Cf6' },
      { num: 3, w: 'Ff4', b: 'e6'  },
      { num: 4, w: 'e3',  b: 'Fd6' },
      { num: 5, w: 'Fxd6',b: 'Dxd6'},
    ],
    content: [
      {
        title: 'Un système universel',
        body: "Le Système de Londres (1.d4 2.Cf3 3.Ff4) est un développement fiable et flexible pour les Blancs. Il évite la théorie intensive des gambits et établit une solide structure de pions.",
      },
      {
        title: 'Idée stratégique',
        body: "Les Blancs développent leurs pièces vers des cases naturelles : Cf3 contrôle e5, Ff4 développe le fou avant de fermer le centre avec e3. La structure est stable et les Blancs gardent un avantage d\'espace.",
      },
      {
        title: 'Plan typique',
        body: "Après le développement initial, les Blancs visent l\'avance e4 pour libérer leurs pièces. La tour en f1 soutient f4-f5 pour une attaque sur l\'aile roi dans certaines variantes.",
      },
    ],
  },

  finales_pions: {
    id: 'finales_pions',
    tag: 'Fin de partie',
    badge: 'Fondamental',
    badgeColor: '#073002',
    title: 'Finales de Pions',
    subtitle: 'La Règle du Carré',
    accuracy: '92.1%',
    boardPosition: 'finales_pions',
    moves: [
      { num: 1, w: 'Rg5', b: 'Rf7' },
      { num: 2, w: 'Rf5', b: 'Re7' },
      { num: 3, w: 'Re5', b: 'Rd7' },
      { num: 4, w: 'Rd5', b: 'Rc7' },
      { num: 5, w: 'f5',  b: '…'   },
    ],
    content: [
      {
        title: 'La règle du carré',
        body: "La règle du carré permet de déterminer si le roi peut attraper un pion passé sans calcul. Tracez un carré depuis le pion jusqu\'à la 8e rangée — si le roi adverse entre dans ce carré, il rattrape le pion.",
      },
      {
        title: 'L\'opposition',
        body: "L\'opposition est la relation entre les deux rois quand ils se font face avec un nombre impair de cases entre eux. Le roi qui n\'est PAS en train de jouer tient l\'opposition et bloque l\'adversaire.",
      },
      {
        title: 'Principe de Zugzwang',
        body: "Dans les finales de pions, le Zugzwang — la contrainte de jouer — est une arme décisive. Forcer l\'adversaire à jouer quand toute réponse aggrave sa position est souvent la clé de la victoire.",
      },
    ],
  },

  capablanca: {
    id: 'capablanca',
    tag: 'Grands Maîtres',
    badge: 'Classique',
    badgeColor: '#352518',
    title: "L'Art de Capablanca",
    subtitle: 'La Simplicité dans la Victoire',
    accuracy: '96.8%',
    boardPosition: 'capablanca',
    moves: [
      { num: 1, w: 'Cd5', b: 'Cxd5' },
      { num: 2, w: 'exd5',b: 'Cb8'  },
      { num: 3, w: 'b4',  b: 'Fd7'  },
      { num: 4, w: 'a4',  b: 'a6'   },
      { num: 5, w: 'Tb3', b: '…'    },
    ],
    content: [
      {
        title: 'Le génie de la simplicité',
        body: "José Raúl Capablanca (1888–1942), 3e champion du monde, était réputé pour la clarté cristalline de son jeu. Là où d\'autres cherchaient la complexité, il trouvait la simplicité — et c\'était dévastateur.",
      },
      {
        title: 'La prophylaxie',
        body: "Capablanca maîtrisait l\'art de la prophylaxie : neutraliser les plans adverses avant qu\'ils ne se réalisent. Chaque coup préventif réduisait le jeu de l\'adversaire à néant sans brillance apparente.",
      },
      {
        title: 'Les finales de Capablanca',
        body: "Ses finales sont des chefs-d\'œuvre pédagogiques. La conversion d\'un avantage minime en victoire semblait naturelle et inévitable. Étudier ses fins de parties est la meilleure école pour tout joueur sérieux.",
      },
    ],
  },
}

// Mapping depuis la Library vers les IDs de leçons
export const OPENING_TO_LESSON = {
  1: 'sicilienne',
  2: 'gambit_dame',
  3: 'defense_francaise',
  4: 'stafford',
  5: 'systeme_londres',
  7: 'finales_pions',
  8: 'capablanca',
}
