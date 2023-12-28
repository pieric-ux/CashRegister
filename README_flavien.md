# Feedback sur le code

Je fais ce document pour centraliser certaines des idées et lister certains conseils.

Je voulais te dire que le projet est vraiment excellent et que ça montre que tu maîtrises React. Il y a des choses à améliorer, mais pas mal de choses sont des préférences personnelles et pas des erreurs graves.

Il faut absolument que tu mettes ce projet dans tes dossiers de candidature car il montre que tu sais faire Une application complexe avec de l’authentification, de la gestion l’accès, de la gestion donnée….

## Projet perso qui peut t'aider

J'ai récemment bossé sur un projet et je suis pas mal content du résultat. Je pense que tu peux t'en inspirer pour certaines choses.

Le projet est en NextJS, TypeScript, TailwindCSS, ShadCN UI, Drizzle comme ORM, Supabase comme DB. C'est pas la même stack du tout mais ça te permet de voir comment j'ai structuré le code et comment j'ai fait certaines choses.

-   https://github.com/flavienbonvin/magic-mailer

## Les petits commentaires

Voilà les quelques éléments principaux qui sont ressortis de mon analyse.

Je me suis concentré sur la partie JavaScript du projet et je n’ai pas trop regardé le reste.

### Beaucoup de useEffects

Premièrement l’utilisation de `useEffects` est discutable, ce n’est pas quelque chose qui est très recommandé. En plus de ça, il peuvent créer des bugs qui sont difficiles à debugger. Je te conseillerais de passer en revue tous les `useEffect`` pour voir si ils sont nécessaire ou pas.

Certaines fois il est possible d’appeler directement la méthode plutôt que de utiliser un `useEffect`, d’autres fois cela va demander un petit peu de refactoring.

### Beaucoup de commentaires

Ton code contient beaucoup de commentaires, pas tous sont utiles. Par exemple, on sait que appeler Axios et faire un POST va mettre à jour les données sur le serveur, pas besoin d’en faire un commentaire.

Ce n’est pas un problème mais en général le code n’est jamais autant commenté que cela.

Je comprends que c’est pour un projet d’apprentissage et cela fait du sens de plus commenter.

### Utilisation de composants standarsd

Je vois que tu as un dossier de composant et pourtant certains boutons ou autre éléments simples d’interfaces sont réutilisé plusieurs fois dans ton code.

Je ne sais pas si une raison à cela, je n’ai pas lancé le code pour voir la différence des boutons mais je pense que certains éléments peuvent être réutilisés.

### SVG dans le code

Je suis remarqué que tu avais beaucoup de SVG dans ton code et je ne sais pas pour quelle raison tu as décidé d’utiliser des SVG directement et pas une librairie d’icônes.

Dans tous les cas, j’aurais extrait les SVGs dans d’autres composants pour faciliter la lecture du code.

Plutôt que de lire un SVG tout moche et de se demander à quoi cela ressemble, je vois directement ce que l'icone représente. On peut lire `<TrashIcon />` au lieu de totu le SVG. Le code est plus court et plus facile à lire de cette façon.

Il y a aussi des librairies d'icônes que tu peux utiliser, elles n’ont pas d’impact sur les performances car toutes les icônes utilisé ne seront pas ajouté au bundle.

J'utilise souvent les suivantes:

-   https://lucide.dev/
-   https://heroicons.com/

### Utilisation de CLSX

Je vois que tu n’as pas utilisé la CLSX pour merger les classes. C’est tout à fait possible de faire sans, mais cette librairie permet de se faciliter un petit peu la vie et d’éviter de devoir faire une template string et de concaténer les classes.

C’est une toute petite librairie qui permet de vraiment simplifier les choses. Je te conseille de regarder et de l’utiliser si tu trouves que cela est utile.

-   https://github.com/lukeed/clsx

### Duplication de certains composants

Tu as souvent créé des composants de création et de mises à jour des données.

Je pense que ce ne soit pas nécessaire car il est possible de savoir si on crée ou qu’on met à jour un élément en testant une propriété.

Si on passe une donnée c’est qu’on est en mode édition, sinon on est en mode création et on peut agir en conséquence. Cela permet de diviser par deux les composants et donc de simplifier le code. Les changements de design ou de champs de fomulaire seront bien plus facile comme ça!

### Manque de division de code

Il y a certains composants qui sont très longs et qui pourrait être divisé en plusieurs composants plus petit.

En général je décide de créer un sous-composant si je dois filter et faire un map sur un tableau. C’est le signal qui m’indique que le code pourrait être plus simple ou plus facile à lire si j’utilisais plusieurs composants.

### Initialisation de variables dans les composants

J’ai aussi quelques fois que tu initilise des variables dans le composant. Cela peut créer des problèmes de performances (je ne pense pas que ce soit un problème dans ton cas).

Il faut garder l’esprit que les composants sont exécutés à chaque fois qu’une props ou que une valeur du state change. Tout le code du composant est exécuté et de nouvelle variables sont crées même si elles sont identiques d'une exécution à l'autre.

Sortir du code de ses composants permet de alléger ces rendus et d’éviter des problèmes de performance. C’est des détails dans ton cas, mais c’est une petite amélioration qui ne fait pas de mal.
