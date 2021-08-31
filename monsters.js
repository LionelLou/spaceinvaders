
//Fonction pour la création des monstres et leur affichage


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
    
    
   
    // Test avec 1 monstre pour le débug en cas de soucis : 
    
    /*monsterXY.push({

        X: Math.round(canvas.width / 6),
        Y: Math.round(canvas.height / 12),
        marginX: 1,
        marginY: -10,
        size: 5

    });
    

    ctx.fillStyle = 'rgb(' + 256 + ',' + 256 + ',' + 256 + ')';
    monsterSkin(monsterXY.X, monsterXY.Y, monsterXY.size);
    */
    
    
    
}