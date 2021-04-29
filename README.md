# What's for dinner? 
<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/screenshot.png" width="300">


## Installation
1. Clone repo
```
git clone git@github.com:sreen020/browser-technologies-2021.git
```

2. Install packages
```
npm install
```

3. Start server
```
npm run watch
```

4. Visit site
```
Type in your browser localhost:4000
```

## Packages
- ejs
- express
- node-fetch
- socket.io
- nodemon

## live demo
https://whats-for-dinner-rtw.herokuapp.com/categorie

## Course
The course Real-Time Web is about learning how to build a real-time application. Real-Time Web is part of the half year minor programme about Web Design and Development in Amsterdam. Bachelor Communication and Multimedia Design, Amsterdam University of Applied Science.

## Concept ideas
**Concept 1 - Roulette**<br>
De mensen die wel eens in een casino zijn geweest weten dat roulette een belangrijk spel is in de gokwereld. Roulette is een spel waarbij een balletje wordt geschoten en uiteindelijk op een getal terechtkomt. De spelers die geld hebben ingezet op dit getal hebben dus gewonnen. Naast een specifiek getal kiezen kan je ook op kleur, even of oneven, 1/3e of op de helft van alle getallen zetten. De prijs die de winnaar krijgt varieert.

Features 
- Verschillende game rooms 
- “inloggen”
- Realtime inleggen
- Vorig gedraaide nummers tonen
- Chat functie binnen game room
- Elke gebruiker starters geld geven

Het lijkt mij erg leuk om een roulette spel te maken met gebruik van websockets. Uiteindelijk heb ik dit concept niet gekozen. Het werd mij aangeraden om een externe API te gebruiken, deze zal ik niet nodig hebben tijdens het maken van deze roulette tafel.

<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/IMG_0171.jpg" width="800">
<br><br><br>

**Concept 2 - What’s for dinner?**<br>
Wat gaan we vanavond en morgenavond eten? Hebben we nog eieren thuis? Komen deze vragen jouw bekend voor, dan is deze app wellicht iets voor jouw. 

Deze app maak ik voornamelijk voor mijn eigen huishouden. Het eten bedenken en boodschappen doen is hier een berucht verhaal. Vaak worden boodschappen dubbel gehaald, sommige dagen wil iedereen iets anders eten en andere dagen heeft niemand inspiratie en weten we allemaal niets te verzinnen om te eten. Deze app gaat ons hierbij helpen.

Binnen deze app heb je 3 core functionaliteiten:
- Recepten bekijken
- Boodschappenlijstje 
- Chat om te overleggen

Zo kunnen we allemaal een recept kiezen/voorleggen die jouw lekker lijkt. Wanneer er besloten is om dit gerecht te gaan maken kunnen de ingrediënten toegevoegd worden aan jouw boodschappenlijstje. Wanneer je dan in de supermarkt staat met vragen open je de chat en stel je jouw vragen.

Features
- Recepten ophalen (API)
- Realtime boodschappenlijst
- Ingrediënten van een gerecht kunnen met 1 druk op de knop toegevoegd worden aan jouw boodschappenlijst 
- Notificatie wanneer iets in jouw winkelmandje is gezet.
- Realtime chat app
- Kunnen zien wie wat typt
- Push notificaties wanneer je een bericht ontvangt

<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/IMG_0173.jpg" width="800">
<br><br><br>

**Concept 3 - Social media** <br>
In eerste instantie wilde ik dit concept graag uitwerken omdat het me erg vet lijkt om aan een social media app te werken. Uiteindelijk heb ik hier niet voor gekozen omdat ik hoorde dat veel klasgenoten dit ook gingen doen. 

Wanneer ik een social media app ga maken moeten er een aantal functionaliteiten inzitten:
- Direct messaging 
- Notificaties
- Like een post
- Reageer op een post
- Upload een post
- Remove een post
- Registreer / login

Dit concept wil ik zeker nog een keer uitwerken in de toekomst!

<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/IMG_0172.jpg" width="800">
<br><br><br>

## data lifecycle diagram
<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/data-lifecycle-diagram.png" width="800">

## Features

**Recipes**
Op deze pagina kan je een groot assortiment recepten verkrijgen. Alle recepten zijn gecategoriseerd en onderverdeeld in verschillende pagina's. Deze recepten komen uit de "Free meal API". 

De data van deze API wordt ingedeeld in kleine requests. Zo heb ik vor elke pagina een nieuwe API call moeten doen. Zo ziet de data van de API eruit: 

**All categories**
```
    {
      "idCategory": "4",
      "strCategory": "Lamb",
      "strCategoryThumb": "https:\/\/www.themealdb.com\/images\/category\/lamb.png",
      "strCategoryDescription": "Lamb, hogget, and mutton are the meat of domestic sheep (species Ovis aries) at different ages.\r\n\r\nA sheep in its first year is called a lamb, and its meat is also called lamb. The meat of a juvenile sheep older than one year is hogget; outside the USA this is also a term for the living animal. The meat of an adult sheep is mutton, a term only used for the meat, not the living animals. The term mutton is almost always used to refer to goat meat in the Indian subcontinent.\r\n\r\n"
    },
    {
      "idCategory": "5",
      "strCategory": "Miscellaneous",
      "strCategoryThumb": "https:\/\/www.themealdb.com\/images\/category\/miscellaneous.png",
      "strCategoryDescription": "General foods that don't fit into another category"
    }
```

**Spicific categorie**
```
    {
      "strMeal": "Baked salmon with fennel & tomatoes",
      "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/1548772327.jpg",
      "idMeal": "52959"
    },
    {
      "strMeal": "Cajun spiced fish tacos",
      "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/uvuyxu1503067369.jpg",
      "idMeal": "52819"
    }
```

**Spicific meal**
```
      "idMeal": "52993",
      "strMeal": "Honey Balsamic Chicken with Crispy Broccoli & Potatoes",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "American",
      "strTags": null,
      "strYoutube": "",
      "strIngredient1": "Potatoes",
      "strIngredient2": "Broccoli",
      "strIngredient3": "Garlic",
      "strIngredient4": "Chicken Breast",
      "strIngredient5": "Balsamic Vinegar",
      "strIngredient6": "Honey",
      "strIngredient7": "Chicken Stock",
      "strIngredient8": "Butter",
      "strIngredient9": "Vegetable Oil",
      "strIngredient10": "Olive Oil",
```

<img src="https://github.com/sreen020/real-time-web-2021/blob/main/public/img/readme-images/screenshot.png" width="300">

