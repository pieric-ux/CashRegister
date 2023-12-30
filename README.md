# Cash Register

<div align="center">
  <a href="https://hevs.responsivedesign" target="_blank">
    <img src="https://github.com/pieric-ux/CashRegister/assets/93613004/9e30952c-b0fd-4764-a6a2-722e453a72d3">
  </a>
</div>

## À Propos

Le projet **Cash Register** est une application qui simule une caisse enregistreuse. Il s'agit d'une application de point de vente qui permet aux commerçants de **gérer leurs transactions, produits, et vaisselles consignées**. L'application offre un moyen facile de suivre les ventes et les retours d'articles. Le calcul des consignes est **automatiquement ajouté** aux différents produits, tout cela à travers une **interface utilisateur conviviale**.

## Fonctionnalités

-   **Gestion multi-applicatives**: Créez plusieurs applications facilement pour vos différents besoin.
-   **Gestion des postes de travail**: Ajoutez plusieurs postes de travail avec une liste de produits unique.
-   **Gestion des employés**: Assigner différents employés aux postes de travail facilement par drag-and-drop.
-   **Gestion des produits**: Ajoutez, supprimez ou modifiez les informations sur les produits.
-   **Gestion de la vaisselle consignée**: Suivi de la vaisselle consignée vendues avec un produit, ou séparément.
-   **Catégories de produits**: Classez vos produits dans différentes catégories pour une meilleure organisation.
-   **Gestion des transactions**: Suivez vos ventes avec un suivi facile, ainsi que le details de chaque transactions.
-   **Interface conviviale**: Navigation aisée avec une interface utilisateur moderne.
-   **Localisation**: Prend en charge plusieurs langues grâce à l'internationalisation.

## Technologies Utilisées

-   **Laravel**
-   **React**
-   **Tailwind CSS**
-   **Beautiful-dnd pour React**
-   **Swiper pour React**
-   **i18next pour l'internationalisation**

## Configuration (Setup)

### Prérequis

-   PHP >= 8.1
-   Composer >= 2.5.7
-   Node.js >= v19.4
-   npm >= v9.2

### Installation

1. **Accédez au répertoire du projet**
    ```bash
    cd CashRegister
    ```
2. **Installez les dépendances**

    ```bash
    composer install
    npm install
    ```

3. **Migrez la base de donnée**
    ```bash
    php artisan migrate
    ```
4. **Lancez le serveur de développement**
    ```bash
    php artisan serve
    npm run dev
    ```

L'application devrait maintenant être en cours d'exécution sur `http://localhost:8000` ou toutes autres adresses affichées dans votre terminal.

## Utilisation

<div align="center">
    <img width="800" alt="CreateApp" src="https://github.com/pieric-ux/CashRegister/assets/93613004/803c71da-b1aa-482b-8e60-02d37ea5900d">
</div>

1. **Créez une application**: Créez une application, et insérer les données demandées.

<div align="center">
    <img width="800" alt="ConfigureApp" src="https://github.com/pieric-ux/CashRegister/assets/93613004/5730c105-a45c-4108-9904-e8e81423c101">
</div>

2. **Configurez l'application**: Sur la page des applications, sélectionner la roue de configuration.
 <div align="center">
    <img width="800" alt="ConfigureEmployees" src="https://github.com/pieric-ux/CashRegister/assets/93613004/d863f518-9568-4a37-a4de-be0b689f18d5">
 </div>

3. **Gestion des employés**: Sur la page employés, vous pouvez gérer les employés, ainsi que générer un nouveau code pour chaque employé.
 <div align="center">
    <img width="800" alt="ConfigureWorkstations" src="https://github.com/pieric-ux/CashRegister/assets/93613004/c9f3eb79-25b1-4f98-bcba-cdc0e0b5f5ba">
 </div>

4. **Gestion des postes de travail**: La page des postes de travail permet de gérer l'assignation des employés et des produits pour chaque poste. Pour cela, il suffit de drag-and-drop les employés et les produits dans les différentes colonnes.
 <div align="center">
    <img width="800" alt="ConfigureCategories" src="https://github.com/pieric-ux/CashRegister/assets/93613004/06199406-5972-4774-b2d8-789d64936a7b">
 </div>

5. **Gestion des catégories**: Les catégories peuvent être ajoutées ou modifiées dans le panneau de configuration. Leurs ordres d'affichage dans cette vue sera reflété sur l'application de caisse enregistreuse. Pour changer l'ordre, utilisez le drag-and-drop entre les catégories.
 <div align="center">
    <img width="800" alt="ConfigureDishes" src="https://github.com/pieric-ux/CashRegister/assets/93613004/3eca8782-29aa-4c7f-8dbf-ca9f346dac99">
 </div>

6. **Gestion de la vaisselle**: Les vaisselles peuvent être utilisée avec ou sans consignes, et dans le cas ou l'on souaitherait pouvoir vendre un article vaisselle, on peut choisir de le vendre séparément.
 <div align="center">
     <img width="800" alt="ConfigureProducts" src="https://github.com/pieric-ux/CashRegister/assets/93613004/8b78ccaf-f2f4-4e92-972c-40c0a24a09a3">
 </div>

7. **Gestion des produits**: Les produits peuvent peuvent être vendu avec un article vaisselle. A ce moment, si l'article vaisselle est consigné, l'ajout de la consigne sera fait automatiquement pour chaque vente du produit. Vous pouvez également ajouter la catégories du produit.
 <div align="center"> 
    <img width="800" alt="ShowTransactions" src="https://github.com/pieric-ux/CashRegister/assets/93613004/3065fa65-ffc7-49de-9f2e-f6c67ada835d">
 </div>

8. **Affichage des transactions**: La page transactions permet l'affichage de toutes les transactions effectuées sur l'application. Vous pouvez également voir les détails de chaque transaction.
 <div align="center">
     <img width="400" alt="Capture d’écran 2023-08-24 à 17 11 43" src="https://github.com/pieric-ux/CashRegister/assets/93613004/fb4a26d8-d947-4ddf-846f-bc3f66628d9e">
     <img width="400" alt="Capture d’écran 2023-08-24 à 17 16 17" src="https://github.com/pieric-ux/CashRegister/assets/93613004/180d9e6a-7169-4bc5-8297-9b5adef4c361">
 </div>

9. **CashRegister**: Pour vous connectez à la caisse enregistreuse en tant qu'employé, consulter vos emails. Lors de la création d'un employé, un e-mail est généré avec les informations de connexion. Une fois sur la page caisse enregistreuse, vous pouvez basculez de vue entre le panier et les produits à l'aide du bouton dédié.
   Vous pouvez swiper les produits si ils ne sont pas tous affichés. La barre de progession au-dessus vous indique si plusieurs produits ne sont pas visible.

## Sécurité et Vulnérabilités

Si vous découvrez une vulnérabilité de sécurité au sein de CashRegister, merci de bien vouloir envoyer un e-mail à Demont Pieric via [demont.pieric@gmail.com](mailto:demont.pieric@gmail.com). Toutes les vulnérabilités de sécurité seront **traitées rapidement**.

© 2023 Demont Pieric. Tous droits réservés.
