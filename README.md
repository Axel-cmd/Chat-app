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

 - Créer dans la racine du dossier backend un dossier nommé config
 - Créer un fichier default.ts avec le code suivant 
```
export default {
    port: 8080,
    host: "localhost",
    dbUri: "",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    privateKey: ``,
}
```

```
cd .\backend
npm i
npm run dev
```
> L'api tourne sur le port 8080 

## Socket 


```
cd .\socket
npm i 
npm run start 
```
> la socket tourne sur le port 4200 

## Frontend 
```
cd .\frontend
npm i 
npm run start
```
> le frontend tourne sur le port 3000 
