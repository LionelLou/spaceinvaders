
let canvas, ctx, monsterXY=[], heroXY={}, laserXY=[];



// Création et Affichage du placement des monstres

function monsterCreation(){

    let pasDeX= (canvas.width/6), pasDeY= (canvas.height/12)

    for( let i = 1 ; i <= 5 ; i++){
        
        for( let j = 1 ; j <= 5 ; j++){
            
            monsterXY.push({

                X : Math.round(  pasDeX * i),
                Y : Math.round(  pasDeY * j ),
                margeX : 1,
                margeY : -10,
                size : 5

            });
        }
    }

    for( let j = 0 ; j<25 ; j++ ){
        
        ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
        monsterSkin(monsterXY[j].X , monsterXY[j].Y , monsterXY[j].size );

    }
}


// Création et Affichage du Héro 


function heroPosition(){

    heroXY = {     X : Math.round( canvas.width /2 ),    Y : Math.round( canvas.height - (canvas.height /12) ), size : 5}; 

    ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    heroSkin(heroXY.X , heroXY.Y, heroXY.size);

}




// Fonction du déplacement du héros et récupération des touches


function hero_Moving_Shooting(){

    let htmlPage = document.querySelector('html');

    htmlPage.addEventListener( 'keydown' , function(event) {

        let touche =  window.event ? event.keyCode : event.which;  //on récupère la valeur de la touche enfoncée 

        if(touche == 81 || touche == 113){  //Déplacement vers la gauche

            ctx.clearRect(heroXY.X - heroXY.size , heroXY.Y - heroXY.size, (heroXY.size*2), (heroXY.size*2));
            heroXY.X -= 2;
            console.log(heroXY.X);
            heroSkin(heroXY.X , heroXY.Y, heroXY.size );

        }

        if(touche == 68 || touche == 100){  // Déplacement vers la droite
            
            ctx.clearRect(heroXY.X - heroXY.size , heroXY.Y - heroXY.size, (heroXY.size*2), (heroXY.size*2));
            heroXY.X += 2;
            console.log(heroXY.X);
            heroSkin(heroXY.X , heroXY.Y, heroXY.size );
        }
        
        if( touche == 32 ){   // Création d'un objet laser chaque fois que l'on appuye sur Espace

            laserXY.push( { 
                X  : heroXY.X,
                Y1 : heroXY.Y - 6,
                Y2 : heroXY.Y - 16
            });
           
        }

    });

}





// Fonction pour la création du skin du projectile du héros

function laserSkin(Ax, Ay, By){

        
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax, By);
        ctx.strokeStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
        ctx.stroke();


}

// Création du Skin des Monstres 

function monsterSkin(X,Y,side){
        
    ctx.fillRect(X, Y, side, side);
}


// Création du Skin du Héro 

function heroSkin(X, Y, radius ){

    ctx.beginPath();
    ctx.arc(X, Y, radius, 0, 2*Math.PI);
    ctx.fill();

}


// Gestion de colision Monstre / Projectile 

    // 1 . création d'un fonction pour parcourir la liste des monstres et comparer avec By du laser 






// Fonction du déplacement des monstres

function monsterMove(){

    
    //while( monsterXY.length > 0 ){
        
        
        for( let i = 0, c = monsterXY.length ; i < c ; i++){ //boucle qui affiche le mouvent des carés
        
            ctx.clearRect(monsterXY[i].X , monsterXY[i].Y, monsterXY[i].size, monsterXY[i].size);    //effaçage du précedent carré 
            monsterXY[i].X += monsterXY[i].margeX;                                                   //déplacements selon X 

            if( monsterXY[i].X <= 0 || monsterXY[i].X >=  (canvas.width - monsterXY[i].size) ){  //gestion de colision avec le bord
            
                for( let j = 0, d = monsterXY.length ; j <= d ; j++){ // boucle pour effacer les carées et les afficher un pas plus bas

                    ctx.clearRect(monsterXY[j].X , monsterXY[j].Y, monsterXY[j].size, monsterXY[j].size); 
                    monsterXY[j].margeX = -monsterXY[j].margeX;
                    monsterXY[j].Y -= monsterXY[j].margeY;
                }

            }
            

            /*if ( monsterXY[i].Y > canvas.height - 2*monsterXY[i].margeY ){

                alert( "VOUS AVEZ PERDU");
                break;
            }*/
            
            
            monsterSkin(monsterXY[i].X , monsterXY[i].Y, monsterXY[i].size );

        }

        for( let i = 0 , c = laserXY.length ; i < c ; i++){

            laserXY[i].Y1 -= 1;
            laserXY[i].Y2 -= 1;
            ctx.clearRect( laserXY[i].X - 1  , laserXY[i].Y1 , 2, 2  );
            laserSkin( laserXY[i].X, laserXY[i].Y1, laserXY[i].Y2);
            
        }
    //}
        
}

// fonction Principale du Jeu


function spaceInvader(){


    canvas = document.querySelector('canvas'); // récupére l'objet canvas dans la page html et le stocke dans une variable
    ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width,canvas.height); // vider l'écran de jeu 


    monsterCreation();

    
    heroPosition();
    
    hero_Moving_Shooting();

    setInterval(monsterMove,250);

    

}



