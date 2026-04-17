// Toutes les leçons de l'application
// Chaque leçon a : id, meta, contenu théorique, notation des coups, exercices, position du board

export const LESSONS = {

  // ─────────────────────────────────────────────
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
      { num: 1, w: 'e4',   b: 'c5'   },
      { num: 2, w: 'Cf3',  b: 'd6'   },
      { num: 3, w: 'd4',   b: 'cxd4' },
      { num: 4, w: 'Cxd4', b: 'Cf6'  },
      { num: 5, w: 'Cc3',  b: 'a6'   },
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
    exercises: [
      {
        id: 'sic_1',
        title: 'Le coup clé du Najdorf',
        question: "Après 5.Cc3 a6, White joue 6.Fg5. Quel est l'objectif principal de ce coup ?",
        options: ['Attaquer le roi noir', 'Épingler le cavalier f6 pour affaiblir e5', 'Préparer le roque', 'Gagner un pion immédiatement'],
        correct: 'Épingler le cavalier f6 pour affaiblir e5',
        explanation: "6.Fg5 épingle le cavalier f6 contre la dame. Sans ce cavalier, la case e5 devient faible et White prépare f4-f5 pour une attaque sur l'aile roi.",
      },
      {
        id: 'sic_2',
        title: 'Le sacrifice thématique',
        question: "Dans la Sicilienne Dragon, Black a souvent le coup ...Rxc3! Quel est le but de ce sacrifice ?",
        options: ['Récupérer du matériel', 'Détruire la structure de pions blancs et ouvrir la colonne b', 'Forcer le roque adverse', 'Gagner un temps de développement'],
        correct: 'Détruire la structure de pions blancs et ouvrir la colonne b',
        explanation: "...Rxc3! suivi de bxc3 crée des pions doublés isolés blancs en c2-c3. La colonne b s'ouvre pour la tour noire et le roi blanc devient vulnérable à long terme.",
      },
      {
        id: 'sic_3',
        title: 'Le cavalier dominant',
        question: "White place un cavalier en d5 dans la Sicilienne. Comment Black doit-il réagir ?",
        options: ['Ignorer et attaquer ailleurs', 'Échanger immédiatement avec ...Cxd5', 'Préparer ...e6 pour chasser le cavalier', 'Jouer ...f6 pour le chasser'],
        correct: 'Échanger immédiatement avec ...Cxd5',
        explanation: "Un cavalier blanc en d5 est extrêmement fort — il contrôle des cases clés et ne peut être chassé par un pion. Il faut l'échanger avec ...Cxd5 avant qu'il ne devienne indélogeable.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
        title: "Un gambit qui n'en est pas un",
        body: "Le Gambit de la Dame (1.d4 d5 2.c4) est l'une des ouvertures les plus respectées. White offre le pion c4, mais après 2...dxc4 le récupère facilement — c'est plus une invitation positionnelle qu'un vrai sacrifice.",
      },
      {
        title: 'La bataille du centre',
        body: "L'objectif principal des Blancs est d'établir un pion central fort avec e4. Les Noirs doivent décider : accepter le gambit (GDA), le refuser (GDR), ou jouer la Slave pour défendre d5 différemment.",
      },
      {
        title: 'Variante principale : Gambit Refusé',
        body: "Après 2...e6, les Noirs renforcent d5 et gardent une structure solide. La partie évolue vers un milieu de jeu positionnel où la compréhension des structures de pions est décisive.",
      },
    ],
    exercises: [
      {
        id: 'gd_1',
        title: 'Accepter ou refuser ?',
        question: "Après 1.d4 d5 2.c4, Black joue 2...dxc4 (Gambit Accepté). Quelle est la réponse correcte de White ?",
        options: ['Dxc4 immédiatement', 'e3 puis Fxc4', 'b3', 'd5'],
        correct: 'e3 puis Fxc4',
        explanation: "Après 2...dxc4, White joue 3.e3 pour développer le fou avec Fxc4. Dxc4 est prématuré car la dame sera repoussée avec ...c5 et ...Cc6. Le plan e3+Fxc4 développe harmonieusement.",
      },
      {
        id: 'gd_2',
        title: "L'attaque minoritaire",
        question: "Dans la structure Carlsbad (pions noirs c6-d5 vs blancs c4-d4), quel est le plan typique de White ?",
        options: ['Attaque du roi avec f4-f5', 'Poussée b4-b5-bxc6 pour créer une faiblesse en c6', 'Avancer e4-e5', 'Échanger tous les pions centraux'],
        correct: 'Poussée b4-b5-bxc6 pour créer une faiblesse en c6',
        explanation: "L'attaque minoritaire b4-b5-bxc6 crée un pion arriéré en c6 ou un pion isolé en d5. White met en place un blocus et exploite la faiblesse à long terme.",
      },
      {
        id: 'gd_3',
        title: 'Le blocus du pion isolé',
        question: "Black a un pion isolé en d5 après les échanges. Quelle est la meilleure stratégie de White ?",
        options: ['Attaquer d5 immédiatement avec les pièces', 'Placer un cavalier en d4 pour bloquer et échanger les pièces actives de Black', 'Avancer les pions sur l\'aile roi', 'Ouvrir la position'],
        correct: 'Placer un cavalier en d4 pour bloquer et échanger les pièces actives de Black',
        explanation: "Un cavalier en d4 bloque le pion isolé et ne peut être chassé par un pion adverse. White échange ensuite les pièces actives de Black (surtout les fous) pour que le pion isolé devienne une faiblesse structurelle décisive.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
      { num: 3, w: 'Cc3', b: 'Fb4' },
      { num: 4, w: 'e5',  b: 'c5'  },
      { num: 5, w: 'a3',  b: 'Fc3+'},
    ],
    content: [
      {
        title: 'Une forteresse dynamique',
        body: "La Défense Française (1.e4 e6) crée immédiatement une tension après 2.d4 d5. Les Noirs abandonnent temporairement l'espace mais obtiennent une structure solide pour un contre-jeu tardif.",
      },
      {
        title: 'La chaîne de pions',
        body: "La tension centrale autour de e4-d5 est le cœur de la Française. White défend e4 et avance en e5 pour attaquer l'aile roi. Les Noirs contre-attaquent avec c5 contre la base de la chaîne.",
      },
      {
        title: "Tactique clé : l'attaque de la chaîne",
        body: "La règle fondamentale : attaquer la base de la chaîne adverse. Les Noirs visent d4 avec c5, White vise f7 avec l'avance e5-f4-f5. La partie est souvent tranchante malgré une apparence solide.",
      },
    ],
    exercises: [
      {
        id: 'fr_1',
        title: 'Attaquer la chaîne',
        question: "Dans la Française Avancée (e5), Black doit attaquer la base de la chaîne blanche. Quel coup ?",
        options: ['...f6', '...c5 pour attaquer d4', '...h5', '...Ce7'],
        correct: '...c5 pour attaquer d4',
        explanation: "La règle d'or en Française Avancée : attaquer la base de la chaîne de pions. White a la chaîne d4-e5, donc Black attaque d4 avec ...c5. Si White joue dxc5, le pion e5 perd son soutien et Black obtient le contre-jeu.",
      },
      {
        id: 'fr_2',
        title: "Le fou 'mauvais'",
        question: "Le fou noir en c8 est souvent qualifié de 'mauvais' en Française. Comment l'activer ?",
        options: ["Le sacrifier pour l'activité", 'b6 puis Fb7 pour l\'amener sur la grande diagonale', 'e5 pour ouvrir le centre', 'Fd7-Fe8'],
        correct: 'b6 puis Fb7 pour l\'amener sur la grande diagonale',
        explanation: "Le plan b6-Fb7 active le 'mauvais' fou en le plaçant sur la grande diagonale a8-h1. De là, il fait pression sur le centre blanc et devient un atout majeur, surtout si White a avancé son pion en e5.",
      },
      {
        id: 'fr_3',
        title: 'La Variante Winawer',
        question: "Dans la Winawer (3...Fb4), White joue 4.e5. Black répond c5. Puis White joue a3 — pourquoi ?",
        options: ['Pour préparer b4', 'Pour forcer ...Fxc3+ et récupérer la paire de fous', 'Pour protéger b2', 'Pour démarrer une attaque sur l\'aile dame'],
        correct: 'Pour forcer ...Fxc3+ et récupérer la paire de fous',
        explanation: "Après a3, Black doit jouer ...Fxc3+ car le fou est attaqué. White recapture bxc3 et obtient la paire de fous dans une position semi-ouverte. En échange, Black a créé des pions doublés en c2-c3 mais White compense avec l'espace et les fous.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
        body: "Les Noirs créent des déséquilibres intentionnels. Le but n'est pas la récupération du pion, mais l'initiative et la confusion chez l'adversaire qui joue d'instinct.",
      },
      {
        title: 'Variante principale',
        body: "Après 3.Cxe5 d6 4.Cf3 Cxe4, les Noirs récupèrent le pion avec un excellent développement. La partie s'oriente vers un milieu de jeu tactique très favorable aux Noirs.",
      },
    ],
    exercises: [
      {
        id: 'sta_1',
        title: 'Le piège principal',
        question: "Après 4...Cxe4, White joue 5.Dc2 pour attaquer le cavalier. Quelle est la riposte foudroyante des Noirs ?",
        options: ['5...d5', '5...Cf6', '5...Cc6 puis Cd4!', '5...Fe7'],
        correct: '5...Cc6 puis Cd4!',
        explanation: "5...Cc6! menace Cd4 qui forche la dame et le fou. Si 6.Cxe4, alors 6...Cd4! gagne la dame ! C'est le piège classique du Stafford que tout joueur doit connaître pour jouer cette ouverture.",
      },
      {
        id: 'sta_2',
        title: 'Le coup décisif',
        question: "Dans le Stafford, après 5.d3 Cf6 6.Ce3 Fc5, quel coup menace un mat en 2 coups ?",
        options: ['...d5', '...Cg4! visant Ff2+', '...0-0', '...Cc6'],
        correct: '...Cg4! visant Ff2+',
        explanation: "...Cg4! menace Cxf2 suivi de Fxf2+ — le roi blanc est forcé de se déplacer et perd son roque. White ne peut pas facilement se défendre car jouer h3 est répondu par Cxf2! et la dame attaque h3 simultanément.",
      },
      {
        id: 'sta_3',
        title: 'Réfutation correcte',
        question: "White joue 5.Cc3 pour contrer le Stafford. Black joue 5...Cxc3. Après 6.dxc3, quel est le meilleur plan ?",
        options: ['...d5 pousser', '...Fc5 puis Ff2+ si possible', '...Cf6 développer', '...Dc6 attaquer e4'],
        correct: '...Fc5 puis Ff2+ si possible',
        explanation: "...Fc5 développe avec tempo en visant f2. Si White n'est pas attentif, ...Ff2+ est un échec-fourchette qui gagne la tour ! Ce coup combine développement et menaces tactiques concrètes.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
      { num: 1, w: 'd4',  b: 'd5'   },
      { num: 2, w: 'Cf3', b: 'Cf6'  },
      { num: 3, w: 'Ff4', b: 'e6'   },
      { num: 4, w: 'e3',  b: 'Fd6'  },
      { num: 5, w: 'Fxd6',b: 'Dxd6' },
    ],
    content: [
      {
        title: 'Un système universel',
        body: "Le Système de Londres (1.d4 2.Cf3 3.Ff4) est un développement fiable et flexible pour les Blancs. Il évite la théorie intensive des gambits et établit une solide structure de pions.",
      },
      {
        title: 'Idée stratégique',
        body: "Les Blancs développent leurs pièces vers des cases naturelles : Cf3 contrôle e5, Ff4 développe le fou avant de fermer le centre avec e3. La structure est stable et les Blancs gardent un avantage d'espace.",
      },
      {
        title: 'Plan typique',
        body: "Après le développement initial, les Blancs visent l'avance e4 pour libérer leurs pièces. La tour en f1 soutient f4-f5 pour une attaque sur l'aile roi dans certaines variantes.",
      },
    ],
    exercises: [
      {
        id: 'lon_1',
        title: 'Le piège de la structure',
        question: "Black joue ...Ce4 pour attaquer le fou de Londres en f4. Quelle est la meilleure réponse de White ?",
        options: ['Fe5 — retraite active qui prépare f4', 'Fd2 — retraite passive', 'Fg3 — protection statique', 'Fxe4 dxe4 avec pion avancé'],
        correct: 'Fe5 — retraite active qui prépare f4',
        explanation: "Fe5 est la retraite idéale ! Le fou reste actif, surveille la case f6, et prépare f4-f5 pour une attaque directe. Fd2 est trop passif. Fg3 abandonne le contrôle de e5. Fe5 maintient la pression.",
      },
      {
        id: 'lon_2',
        title: "La rupture centrale",
        question: "White a le triangle typique Londres (d4, e3, c3). Quel est l'idéal pion-break pour activer les pièces ?",
        options: ['f4-f5 directement', 'e4 au bon moment, après Fd3 et 0-0', 'c4 pour ouvrir l\'aile dame', 'b4 attaque minoritaire'],
        correct: 'e4 au bon moment, après Fd3 et 0-0',
        explanation: "La rupture e4 libère le fou en d3, active la tour en f1 et ouvre le jeu pour toutes les pièces blanches. Le timing est crucial : préparer avec Fd3, 0-0, puis pousser e4 quand les pièces sont bien placées.",
      },
      {
        id: 'lon_3',
        title: 'Contre le London',
        question: "Black veut contrer le Système de Londres. Quel plan est le plus efficace pour obtenir un contre-jeu ?",
        options: ['...c5 puis ...Cc6 pour attaquer le centre', '...e5 immédiatement', '...Fh3 pour éliminer le fou de Londres', '...b6 et ...Fb7'],
        correct: '...Fh3 pour éliminer le fou de Londres',
        explanation: "...Fh3! est le coup le plus agressif — Black élimine le fou de Londres (l'atout principal de White) en l'échangeant. Sans ce fou, la structure blanche perd son caractère et le jeu s'équilibre. C'est la réponse recommandée par les joueurs modernes.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
        body: "La règle du carré permet de déterminer si le roi peut attraper un pion passé sans calcul. Tracez un carré depuis le pion jusqu'à la 8e rangée — si le roi adverse entre dans ce carré, il rattrape le pion.",
      },
      {
        title: "L'opposition",
        body: "L'opposition est la relation entre les deux rois quand ils se font face avec un nombre impair de cases entre eux. Le roi qui n'est PAS en train de jouer tient l'opposition et bloque l'adversaire.",
      },
      {
        title: 'Principe de Zugzwang',
        body: "Dans les finales de pions, le Zugzwang — la contrainte de jouer — est une arme décisive. Forcer l'adversaire à jouer quand toute réponse aggrave sa position est souvent la clé de la victoire.",
      },
    ],
    exercises: [
      {
        id: 'fp_1',
        title: 'La Règle du Carré',
        question: "Un pion blanc est en f4. Le roi noir est en a6. C'est au tour des Noirs. Le roi noir peut-il attraper le pion ?",
        options: ['Oui — le roi entre dans le carré du pion', 'Non — le pion passe en dame avant que le roi arrive', 'Impossible à déterminer sans plus d\'info', 'Seulement si White fait une erreur'],
        correct: 'Oui — le roi entre dans le carré du pion',
        explanation: "Le carré du pion f4 s'étend jusqu'à f8 et a8. Le roi en a6 est DANS ce carré. Donc avec le trait, il rattrape le pion avant qu'il ne dame. Si c'était au trait de White, le pion damerait.",
      },
      {
        id: 'fp_2',
        title: "L'opposition directe",
        question: "Roi blanc en e5, roi noir en e7, pion blanc en e4. C'est au tour des Noirs. Que se passe-t-il ?",
        options: ['White gagne car il a l\'opposition', 'Nulle car Black tient l\'opposition', 'Black gagne en prenant le pion', 'White doit avancer le pion immédiatement'],
        correct: 'White gagne car il a l\'opposition',
        explanation: "White tient l'opposition (rois face à face, un nombre impair de cases entre eux, c'est au tour de Black). Black doit céder — s'il joue Rf7, White avance Rd6 et le pion passe. S'il joue Rd7, White joue Rf6 avec la même idée.",
      },
      {
        id: 'fp_3',
        title: 'Zugzwang décisif',
        question: "Roi blanc en f6, roi noir en f8, pion blanc en f5. C'est au tour des Noirs. Quel est le résultat ?",
        options: ['White gagne — Black est en Zugzwang', 'Nulle — le roi noir tient l\'opposition', 'Black gagne en avançant son roi', 'Ça dépend de la couleur du pion'],
        correct: 'White gagne — Black est en Zugzwang',
        explanation: "Black est en Zugzwang ! S'il joue Re8, White joue f6 et le pion ne peut plus être arrêté. S'il joue Rg8, White joue Re7 et le pion passe. Toute réponse de Black aggrave sa situation — c'est le Zugzwang parfait.",
      },
    ],
  },

  // ─────────────────────────────────────────────
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
      { num: 1, w: 'Cd5',  b: 'Cxd5' },
      { num: 2, w: 'exd5', b: 'Cb8'  },
      { num: 3, w: 'b4',   b: 'Fd7'  },
      { num: 4, w: 'a4',   b: 'a6'   },
      { num: 5, w: 'Tb3',  b: '…'    },
    ],
    content: [
      {
        title: 'Le génie de la simplicité',
        body: "José Raúl Capablanca (1888–1942), 3e champion du monde, était réputé pour la clarté cristalline de son jeu. Là où d'autres cherchaient la complexité, il trouvait la simplicité — et c'était dévastateur.",
      },
      {
        title: 'La prophylaxie',
        body: "Capablanca maîtrisait l'art de la prophylaxie : neutraliser les plans adverses avant qu'ils ne se réalisent. Chaque coup préventif réduisait le jeu de l'adversaire à néant sans brillance apparente.",
      },
      {
        title: 'Les finales de Capablanca',
        body: "Ses finales sont des chefs-d'œuvre pédagogiques. La conversion d'un avantage minime en victoire semblait naturelle et inévitable. Étudier ses fins de parties est la meilleure école pour tout joueur sérieux.",
      },
    ],
    exercises: [
      {
        id: 'cap_1',
        title: 'Pensée prophylactique',
        question: "White a un avantage positionnel léger. Black menace d5-d4. Comment Capablanca jouerait-il pour prévenir ce coup ?",
        options: ['Attaquer immédiatement sans se soucier de d4', 'Jouer c4 ou b3 pour bloquer d4 avant d\'améliorer d\'autres pièces', 'Sacrifier un pion pour l\'activité', 'Échanger les dames'],
        correct: "Jouer c4 ou b3 pour bloquer d4 avant d'améliorer d'autres pièces",
        explanation: "La prophylaxie de Capablanca : neutraliser le plan adverse AVANT de réaliser son propre plan. Bloquer d4 avec c4 prive Black de son contre-jeu principal. Ensuite White peut améliorer ses pièces tranquillement. C'est la signature de son style.",
      },
      {
        id: 'cap_2',
        title: 'La conversion technique',
        question: "White a un pion passé isolé en d5, une tour active et un roi bien centralisé. Quelle est la priorité de Capablanca ?",
        options: ['Avancer immédiatement le pion d5 vers la dame', 'Échanger les tours pour simplifier en finale de roi et pion', 'Centraliser le roi et soutenir le pion avec la tour par derrière', 'Créer un 2e pion passé'],
        correct: 'Centraliser le roi et soutenir le pion avec la tour par derrière',
        explanation: "La tour derrière le pion passé est un principe fondamental ! Elle protège le pion et l'escorte. Le roi centralisé empêche le roi adverse de bloquer. Capablanca convertissait ces positions avec une précision métronomique sans jamais risquer.",
      },
      {
        id: 'cap_3',
        title: 'Simplification gagnante',
        question: "White est légèrement supérieur avec plus d'espace. Black a des pièces actives. La meilleure approche ?",
        options: ['Compliquer la position pour créer des chances tactiques', 'Attaquer directement le roi adverse', 'Échanger les pièces actives adverses pour rendre la supériorité structurelle décisive', 'Avancer les pions en masse'],
        correct: 'Échanger les pièces actives adverses pour rendre la supériorité structurelle décisive',
        explanation: "Capablanca réduisait les parties à leur essence : éliminer les contre-chances adverses en échangeant ses pièces actives. Une fois les complications éliminées, l'avantage structurel parle de lui-même. 'La meilleure façon de gagner est la plus simple.'",
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
