
let canvas, ctx, monsterXY = [], heroXY = {}, laserXY = [];

let isGameStarted = false; // booléen qui agît comme un On/Off

let myInterval; // interval principal pour faire tourner le jeu 

let htmlPage = document.querySelector('html'); // stockage de l'id la page dans une variable



// STEP 1 : Création du Skin du Héro  

function heroSkin(X, Y, radius) {

    ctx.beginPath();
    ctx.arc(X, Y, radius, 0, 2 * Math.PI);
    ctx.fill();

}


// STEP 2 : Création et Affichage du Héro 


function heroPosition() {

    heroXY = {
        X: Math.round(canvas.width / 2),
        Y: Math.round(canvas.height - (canvas.height / 12)),
        speed: 4,
        size: 5
    };

    ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    heroSkin(heroXY.X, heroXY.Y, heroXY.size);

}


// STEP 3 : Récupération des touches appuyées, création de laser et déplacements associés au héros et laser

function getKey(event) {

    let touche = event.key; //on récupère la valeur de la touche enfoncée 

    let eraseSquare = heroXY.size + 1;// dimensions du carée pour effacer le carée

    if ((touche == 'q' || touche == 'ArrowLeft') && heroXY.X > heroXY.size * 2) {  //Déplacement vers la gauche et test si proche du bord

        ctx.clearRect(heroXY.X - eraseSquare, heroXY.Y - eraseSquare, heroXY.size * 4, heroXY.size * 4);
        heroXY.X -= heroXY.speed;
        heroSkin(heroXY.X, heroXY.Y, heroXY.size);

    }

    if ((touche == 'd' || touche == 'ArrowRight') && heroXY.X < (canvas.width - heroXY.size * 2)) {  // Déplacement vers la droite et test si proche du bord

        ctx.clearRect(heroXY.X - eraseSquare, heroXY.Y - eraseSquare, heroXY.size * 4, heroXY.size * 4);
        heroXY.X += heroXY.speed;
        heroSkin(heroXY.X, heroXY.Y, heroXY.size);
    }

    if (touche == ' ') {   // Création d'un objet laser chaque fois que l'on appuye sur Espace

        if (laserXY.length < 10) { // maximum capé à 10 projectiles

            laserXY.push({

                X: heroXY.X - 1,
                Y: heroXY.Y - 12 - heroXY.size,
                width: 2,
                height: 10,
                speed: 4
                
            });
        }
    }
}




// STEP 4 : Fonction pour la création du skin du projectile du héros

function laserSkin(x, y, width, height) {

    ctx.strokeStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    ctx.fillRect(x, y, width, height);

}


/*-----------------------------------------------------------------------------------------------------------*/

// STEP 5 : Création du Skin des Monstres 

function monsterSkin(X, Y, side) {

    ctx.fillRect(X, Y, side, side);

}


// STEP 6 : Création et Affichage du placement des monstres

function monsterCreation() {

    let stepX = (canvas.width / 6), stepY = (canvas.height / 12);

    for (let i = 1; i <= 5; i++) {

        for (let j = 1; j <= 5; j++) {

            monsterXY.push({

                X: Math.round(stepX * i),
                Y: Math.round(stepY * j),
                marginX: 1,
                marginY: -10,
                size: 5

            });
        }
    }

    for (let j = 0; j < 25; j++) {

        ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
        monsterSkin(monsterXY[j].X, monsterXY[j].Y, monsterXY[j].size);

    }

    // Test avec 1 monstre : 
    /*monsterXY.push({

        X: Math.round((canvas.width / 6)),
        Y: Math.round(canvas.height / 12),
        marginX: 1,
        marginY: -10,
        size: 5

    });


    ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    monsterSkin(monsterXY.X, monsterXY.Y, monsterXY.size);
    */
    
}




// STEP 7 : Gestion de colision Monstre / Projectile 

function collisionDetection( laserX, laserY ){

    let monsterPosition = -1;

    for( let i = 0 ; i < monsterXY.length ; i++ ){

        let distanceX = Math.abs( laserX  - Math.abs( monsterXY[i].X ) );

        let distanceY = Math.abs( laserY  - Math.abs( monsterXY[i].Y ) );


        if ( distanceX <= monsterXY[i].size   && distanceY <= monsterXY[i].size / 2  ) {
            
            monsterPosition = i;

        }
    }

    return monsterPosition ;

}


// STEP 8 : Fonction du déplacement des monstres

function monsterMove() {


    let i = 0, c = monsterXY.length;
    
      //nombre de monstres restants 
    

    while (i < c && isGameStarted) { //boucle qui affiche le mouvement des carrés


        ctx.clearRect(monsterXY[i].X - monsterXY[i].marginX, monsterXY[i].Y - 1, monsterXY[i].size + 2, monsterXY[i].size + 2);    //effaçage du précedent carré 
        monsterXY[i].X += monsterXY[i].marginX;                                                   //déplacements selon X 


        if (monsterXY[i].X <= 5 || monsterXY[i].X >= (canvas.width - monsterXY[i].size) - 5) {  //gestion de colision avec le bord



            for (let j = 0; j <= c; j++) { // boucle pour effacer les carées et les afficher un pas plus bas


                ctx.clearRect(monsterXY[j].X, monsterXY[j].Y, monsterXY[j].size + 2, monsterXY[j].size + 2);
                monsterXY[j].marginX = -monsterXY[j].marginX;
                monsterXY[j].Y -= monsterXY[j].marginY;

            }

        } else if (monsterXY[i].Y > canvas.height - heroXY.size * 4) { //si les monstres sont trop proches du heros  

            endGame('lose');

        }

        monsterSkin( monsterXY[i].X, monsterXY[i].Y, monsterXY[i].size );

        i++; // incrémentation pour le compteur de la boucle while 

    }

    let index = 0;
    let hit = -1
    let numberOfLasers = laserXY.length;

    while ( index < numberOfLasers ) {  //Boucle for pour faire avancer les lasers

        hit = collisionDetection( laserXY[index].X, laserXY[index].Y );
        

        if ( ( laserXY[index].Y + laserXY[index].height ) <= 0) {

            laserXY.splice(index, 1);
            numberOfLasers = laserXY.length;

        }else if ( hit != -1 ) {
            

            ctx.clearRect(monsterXY[hit].X , monsterXY[hit].Y , monsterXY[hit].size , monsterXY[hit].size );
            ctx.clearRect(laserXY[index].X - 1 , laserXY[index].Y , laserXY[index].width + 2, laserXY[index].height + 2 );

            laserXY.splice(index, 1);
            monsterXY.splice(hit, 1);
            hit = -1;
        

        }else{

            
            ctx.clearRect(laserXY[index].X - 1, laserXY[index].Y + 1 , laserXY[index].width + 1 , laserXY[index].height + 1);

            laserXY[index].Y -= laserXY[index].speed; //vitesse de déplacement des lasers

            laserSkin(laserXY[index].X, laserXY[index].Y, laserXY[index].width, laserXY[index].height );

            numberOfLasers = laserXY.length;
            index++;

        }

    }

    if (monsterXY.length == 0) {
            
        endGame('win');

    }

}

/*-----------------------------------------------------------------------------------------------------------*/


// FONCTION PRINCIPALE 


function spaceInvader() {

    canvas = document.querySelector('canvas'); // récupére l'objet canvas dans la page html et le stocke dans une variable
    ctx = canvas.getContext('2d');
    monsterXY = [];
    heroXY = {};
    laserXY = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height); // vider l'écran de jeu 

    heroPosition();

    monsterCreation();

    htmlPage.addEventListener('keydown', getKey);

    myInterval = setInterval(monsterMove, 100);

}



// Fonction pour le démarrage du jeu et les pauses

function startNewGame() {

    if (!isGameStarted) {

        isGameStarted = true;
        spaceInvader();

    }

}

// Fonction fin de partie

function endGame(end) {

    isGameStarted = false;
    clearInterval(myInterval);

    switch (end) {

        case 'lose':

            alert(' Vous avez Perdu ! ');
            break;

        case 'win':

            alert(' Bravo ! Vous avez gagné ! ');
            break;

    }

    let replay = confirm(' Voulez vous rejouer ? ');

    if (replay == true) { // remettre à zéro

        startNewGame();

    }

}