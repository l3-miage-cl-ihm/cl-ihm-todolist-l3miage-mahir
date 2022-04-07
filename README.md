# Projet : To Do List Angular
Création d'une to do list avec le framework Angular en équipe de 2. 



## Equipe
- MAHI Riad
- GAMBIEZ Jérôme

## Lien vers la todolist
http://todolistapp-39f3b.web.app/

## Fonctionnalitées
- Connection à la todolist via FirebaeAuth
- Gestion de plusieurs todolists par utilisateur
- Ajout de champs sur la todolist (emoji, description...) 
- QRCode: Partage de la todolist entre utilisateurs. (Ceux qui ont accès à l'url peuvent modifier la todolist)
- Ajout d'une box de dessin avec le stylé ou la souris. 
- Deploiement en ligne (Firebase Hosting)
- Utilisation du Firebase Storage pour les dessins

## Bugs
- Page de login redirection, probleme sur la fermeture de la fenetre dialog.
- La synchronisation avec le firestore n'est pas assez optimisé.
- Trop long pour créer une nouvelle todolist -> pb causé par le module emoji (à changer)
- Gestion de plusieurs todolists problème de gestion de l'historique, mais totalement fonctionnel pour la gestion d'une seule todolist

## Commandes utiles 
- $ npm i
- $ npm init
- $ npm install --save firebase
- $ npm start


## Améliorations
 - Utilisation de switchMap avec l'utilisation d'un observable qui prend l'utilisateur + une liste de todolist.
 - Amélioration des performances (voir dans la console)
 - Rendre réactive l'application au format mobile (fermeture de la sidebar)
 - Générer une application téléchargeable.
