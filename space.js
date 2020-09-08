
let canvas, ctx, monsterXY=[], heroXY={};



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

        //}
            
    }


// Fonction du déplacement du héros et de ses lasers 


function hero_Moving_Shooting(){

    let htmlPage = document.querySelector('html');

    htmlPage.addEventListener( 'keydown' , function(event) {

        let touche =  window.event ? event.keyCode : event.which;  //on récupère la valeur de la touche enfoncée 

        if(touche == 81 || touche == 113){  //Déplacement vers la gauche

            ctx.clearRect(heroXY.X - heroXY.size , heroXY.Y - heroXY.size, (heroXY.size*2), (heroXY.size*2));
            heroXY.X -= 2;
            heroSkin(heroXY.X , heroXY.Y, heroXY.size );

        }

        if(touche == 68 || touche == 100){  // Déplacement vers la droite
            
            ctx.clearRect(heroXY.X - heroXY.size , heroXY.Y - heroXY.size, (heroXY.size*2), (heroXY.size*2));
            heroXY.X += 2;
            heroSkin(heroXY.X , heroXY.Y, heroXY.size );
        }
        
        if( touche == 32 ){   // Création et Déplacement du Laser 

            let Ax = heroXY.X ;
            let Ay = heroXY.Y - 5;
            let By = heroXY.Y - 15;

            shooting(Ax, Ay, By);
            
   
        
        }



    });

}





// Fonction pour la création du projectile du héros

function shooting(Ax, Ay, By){



        
        ctx.beginPath();
        ctx.moveTo(Ax, Ay);
        ctx.lineTo(Ax, By);
        ctx.strokeStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
        ctx.stroke();

        Ay -= 1;
        By -= 1;


}



// Gestion de colision Monstre / Projectile 

    // 1 . création d'un fonction pour parcourir la liste des monstres et comparer avec By du laser 





// fonction Principale du Jeu


function spaceInvader(){


    canvas = document.querySelector('canvas'); // récupére l'objet canvas dans la page html et le stocke dans une variable
    ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width,canvas.height); // vider l'écran de jeu 


    monsterCreation();

    
    heroPosition();


    hero_Moving_Shooting();

    setInterval(monsterMove,500);

    

}



