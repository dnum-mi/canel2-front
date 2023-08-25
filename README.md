
# Documentation de l'Application Canel

## Description générale

L'application Canel sert de référentiel applicatif. Elle dispose d'une interface composée de plusieurs onglets, notamment : application, acteur, technologie, conformité, interface, environnement et migrations. Les utilisateurs peuvent ajouter, modifier et supprimer des éléments dans chaque onglet.

## Démarrage rapide

### Prérequis

- Node.js et npm (Node Package Manager). Si ce n'est pas le cas, installez [Node.js](https://nodejs.org/fr/).

### Installation et lancement

1. **Clonez le dépôt**:
   ```bash
   git clone git@github.com:dnum-mi/canel2-front.git
   ```
2. **Accédez au répertoire du projet**:
   ```bash
   cd chemin/vers/répertoire-du-projet
   ```
3. **Installez les dépendances**:
   ```bash
   npm install
   ```
4. **Démarrez l'application**:
   ```bash
   npm start
   ```

L'application se lancera en mode développement. Pour la visualiser, ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts utiles

- **Démarrer l'application en mode développement** : `npm start`

---

## État de l'application : Rapport de progression

### Points fonctionnels :

1. **Récupération des données (`GET`)**:
    - La récupération des données pour toutes les tables est opérationnelle.
  
2. **Ajout des données (`POST`)**:
    - Ajout des entrées dans les tables réussi.

### Points à améliorer :

1. **Recherche d'informations**:
    - Dysfonctionnement dans la recherche des informations.

2. **Mise à jour des données (`UPDATE`)**:
    - Problèmes lors de la mise à jour d'une ligne de données dans une table.
    - Le formulaire ne s'affiche pas lors du clic sur l'icône de modification.

3. **Déconnexion**:
    - Bugs identifiés lors de la déconnexion.

4. **Pagination**:
    - Soucis rencontrés avec la pagination des données.