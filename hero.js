

// Création et Affichage du Héro 

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