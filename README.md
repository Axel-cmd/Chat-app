# Chat App
 Projet application de chat  pour le cours backend 

###### Le projet est divisé en 3 parties :

  - API pour le backend
  - Frontend pour le siteweb
  - Socket pour la communication temps réel

***Pour que l'application fonctionne il faut démarrer les 3 parties.***

###### Prérequis :

**nodemon d'installer en global**
```
npm i -g nodemon
```

## API 

###### Prérequis pour le backend

Dans le fichier config/default.ts :
 - lien vers la bdd dans le champs **dbUri**
 - clé privé RSA dans le champs **privateKey**

> L'api tourne sur le port 8080 

```
npm i
npm run dev

```

## Socket 

> la socket tourne sur le port 4200 

```
npm i 
npm run start 
```

## Frontend 

> le frontend tourne sur le port 3000 

```
npm i 
npm run start
```
