# Kat
Projet nodeJS

Concepte du site/application :
Jeu de combat tour par tour (type pokemon/dragon quest) en ligne 
Deux joueurs s’affronte dans un combat avec un de leur personnage.
Pendant la partie, les joueurs peuvent utiliser des potions qu’ils auraient acheté ou gagné. 
La partie se termine quand l’un des deux personnage qui combat n’a plus de vie.
Le gagnant récupère de l’argent. Le perdant perd seulement le match.
Pour soigner le personnages, le joueur peut soit attendre un certain temps soit payer avec l’argent virtuelle
L’argent est utile pour acheter d’autres personnages, des compétences aux personnages que l’on possède, miser sur des combats d’autres joueurs et acheter des potions.
Les personnages à collectionner sont tirée de l’univers d’internet (meme internet, personnes/personnages connu, …)
Les personnages auront chacun leurs caractéristiques: Vie, attaque, défense, etat, coups spéciaux, passifs.
On commence avec un personnage au hasard, puis après plusieurs combats, la personne récupère de l'argent pour s'acheter d'autres combattants et être de plus en plus fort et finir par acheter le boss de tous Keanu Reeves.
Le joueur pourra regarder le combat d'autre joueurs et miser pour gagner un maximum d'argent.

Le site/application aura une interface simple d’utilisation. Une fenêtre où le jeu se déroulera avec des requêtes sur chaque action. On veut quelque chose dynamique pour que plusieur joueurs joue en même temps sur un duel (1vs1) mais pour le système de pari les personnes qui y participeront seront en mode spectateur.
Hors combat la fenêtre de jeu affichera une interface ou plusieur boutons offre le choix d’évolution et achat.
Chaque avancer d’un joueur devra être enregistré.

Conception
Nous utiliserons des bases de données pour stocker tous les personnages, avec leurs caractéristiques, compétences, … via MySQL
Le site sera codé en html/css pour le front et en NodeJS pour le back (consigne)
Pour le jeu, nous avons à notre disposition plusieurs outils pour le développer.
Unity, un outil que nous avons déjà utilisé dans d’autres projets.
Electron on ne connais pas mais qui pourrait être utile à apprendre, un outil qui est multiplateforme et selon leur site “C’est plus facile que vous le pensez”  

Planifier
Recherche pour le jeu/personnage/compétence (semaine 11/11) 
Mise en place des cahier des charges pour le jeu et la partie serveur(semaine 11/11)
création du serveur puis du site en parallèle du jeu.(des que possible)
création de la base de donnée et des personnage du jeu en parallèle.(début semaine du 18/11 ou 25/11 selon l’avancement)
Développement du jeu (début semaine 18/11)
Lien entre site/application electron et le jeu 
créer les requêtes nécessaires au jeu entre le serveur et l'utilisateur.
fonction asynchrone 
sauvegarde de leurs avancer 
améliorer le site et le jeu : autre stats/autre personnage/autre (si on a bien avancé et qu’on a le temps)

 prototype initial
![alt text](blob/master/Page%20test.png?raw=true "Title")
Ébauche du site avec le jeu (idée de conception)

Les personnages de la base de donné ont une image qui fait les actions.
Baisse de la vie des personnages au combat.

Pour réalisé le prototype on utilise unity 3D pour le jeu puis on en fait un projet webGL du jeu qui affichera l’ébauche précédent ou via un site web ou encore avec electron.

