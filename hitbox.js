// Gestion de colision Monstre / Projectile et des Hitboxs

function collisionDetection( laserX, laserY, monsterXY ){

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