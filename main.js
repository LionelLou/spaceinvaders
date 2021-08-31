
let monsterXY = [], heroXY = {}, laserXY = [];

let status = {

    life : 3,
    stage : 1,
    score : 0

}

barSetup(3, 1, 0);

let isGameStarted = false; // booléen qui agît comme un On/Off

let myInterval; // interval principal pour faire tourner le jeu 

let htmlPage = document.querySelector('html'); // stockage de l'id la page dans une variable

let canvas = document.querySelector('canvas'); // récupére l'objet canvas dans la page html et le stocke dans une variable
let ctx = canvas.getContext('2d'); 


// On stocke les fichiers audio dans des variables pour les jouer en temps voulu

let audioWin = new Audio('audio/musiclegends__pickup-coin.wav');
let audioGameOver = new Audio('audio/deleted-user-877451__game-over.wav');
let audioHit = new Audio('audio/musiclegends__hit-hurt.wav');
let audioLaser = new Audio('audio/musiclegends__laser-shoot.wav');
// let audioBomb = new Audio('audio\musiclegends__explosion.wav')   // Futur son de bombe 

/*------------------------------------------- FONCTIONS PRINCIPALES ------------------------------------------*/

/*-------------Récupération de la touches appuyée, pour la création du laser ou le déplacement associé au héros selon Y ------------------*/


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

        audioLaser.play(); // Bruit d'un tir de laser 

        if (laserXY.length < 10) { // maximum capé à 10 projectiles 

            laserXY.push({  // on crée un objet laser que l'on stocke dans un tableau regroupant les lasers

                X: heroXY.X - 1,
                Y: heroXY.Y - 12 - heroXY.size,
                width: 2,
                height: 10,
                speed: 4

            });
        }
    }

    if (touche != '' && !isGameStarted ){

        startNewGame();

    }

}


//  Fonction pour faire tourner le jeu

function gameKernel() {



    let i = 0, c = monsterXY.length; // i désignera l'index permettant de parcourir la liste des monstres


    while (i < c && isGameStarted) { //boucle qui affiche le mouvement des monstres


        ctx.clearRect(monsterXY[i].X - monsterXY[i].marginX, monsterXY[i].Y - 1, monsterXY[i].size + 2, monsterXY[i].size + 2);    //effaçage du précedent carré 
        monsterXY[i].X += monsterXY[i].marginX;                                                   //déplacements selon X 


        if (monsterXY[i].X <= 5 || monsterXY[i].X >= (canvas.width - monsterXY[i].size) - 5) {  //gestion de colision avec le bord des montres



            for (let j = 0; j <= c; j++) { // boucle pour effacer les carées et les afficher un pas plus bas si colision avec un des murs selon X 


                ctx.clearRect(monsterXY[j].X, monsterXY[j].Y, monsterXY[j].size + 2, monsterXY[j].size + 2);
                monsterXY[j].marginX = -monsterXY[j].marginX;
                monsterXY[j].Y -= monsterXY[j].marginY;

            }

        } else if (monsterXY[i].Y > canvas.height - heroXY.size * 4) { //si les monstres sont trop proches du heros selon Y on met fin à la partie 

            
            
            status.life -= 1; // on perd une vie 
            barSetup(status.life , status.stage , status.score );
            endGame('lose');

        }

        monsterSkin(monsterXY[i].X, monsterXY[i].Y, monsterXY[i].size); // On trace 

        i++; 

    }

    let index = 0; // compteur pour la boucle while pour les indexes
    let hit = -1 // permet de recupérer l'index du monstre qui est touché, reste négatif tant que aucun monstres n'est touché
    let numberOfLasers = laserXY.length; // on stocke le nombre de lasers avant opérations 

    while (index < numberOfLasers) {  //Boucle for pour faire avancer les lasers

        hit = collisionDetection(laserXY[index].X, laserXY[index].Y, monsterXY); // on detecte s'il y colision entre laser et monstres


        if ((laserXY[index].Y + laserXY[index].height) <= 0) { // Gestion du cas où le laser dépasse le plafond

            laserXY.splice(index, 1);
            numberOfLasers = laserXY.length;

        } else if (hit != -1) { //gestion en cas de colision avec un laser 

            
            audioHit.play(); // Son du monstre touché par un tir de laser 

            ctx.clearRect(monsterXY[hit].X, monsterXY[hit].Y, monsterXY[hit].size, monsterXY[hit].size);
            ctx.clearRect(laserXY[index].X - 1, laserXY[index].Y, laserXY[index].width + 2, laserXY[index].height + 2);

            status.score += 100;
            barSetup(status.life , status.stage , status.score );

            laserXY.splice(index, 1);
            monsterXY.splice(hit, 1);
            hit = -1;


        } else { // déplacement classique des lasers si aucune perturbation


            ctx.clearRect(laserXY[index].X - 1, laserXY[index].Y + 1, laserXY[index].width + 1, laserXY[index].height + 1);

            laserXY[index].Y -= laserXY[index].speed; //vitesse de déplacement des lasers

            laserSkin(laserXY[index].X, laserXY[index].Y, laserXY[index].width, laserXY[index].height);

            numberOfLasers = laserXY.length; // on récupère le nombre de lasers restants après opération
            index++;

        }

    }

    if (monsterXY.length == 0) { // On teste s'il reste des monstres à détruire, si non, on met fin à la partie 

        
        status.score += 10000;
        status.stage += 1;

        barSetup(status.life , status.stage , status.score );

        endGame('win');

    }

}

/*------------------------------------------- Main function ------------------------------------------*/

function spaceInvader() {


    heroPosition(); // lance la fonction créant la position du héros initiale 

    monsterCreation(/* TODO ajouter la variable qui donne le niveaux en cours  */);  // Créee les monstres du niveau selon un patern prédéfini

    htmlPage.addEventListener('keydown', getKey); // ajoute un écouteur d'évenements 

    myInterval = setInterval(gameKernel, 100);

}

/*--------------------------------------------------------------------------------------------------*/