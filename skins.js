

// --------- Fonction pour la création de skins ------------------- 


//  Création du Skin du Héro 

function heroSkin(X, Y, radius) {

    ctx.beginPath();
    ctx.arc(X, Y, radius, 0, 2 * Math.PI);
    ctx.fill();

}


// Fonction pour la création du skin du projectile du héros

function laserSkin(x, y, width, height) {

    ctx.strokeStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    ctx.fillRect(x, y, width, height);

}


// Création du Skin des Monstres 

function monsterSkin(X, Y, side) {

    ctx.fillRect(X, Y, side, side);

}


