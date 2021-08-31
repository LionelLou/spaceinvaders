// Fonction pour lancer la partie 

function startNewGame() {

    if (!isGameStarted) {

        isGameStarted = true;

        if (status.life == 0) {

            status = {

                life: 3,
                stage: 1,
                score: 0
            }
        }
        reset()
        spaceInvader();
    }
}



// Fonction pour initialiser les valeurs d'affichage de la barre d'état

function barSetup(life, stage, score){

    let hearts = '';
    
    for (let i = 1; i <= life; i++) {

        hearts += '<i class="bi bi-heart-fill"></i>';

    }

    document.getElementById('life').innerHTML = 'Vie : ' + hearts;
    document.getElementById('stage').innerHTML = 'Etage : ' + stage;
    document.getElementById('score').innerHTML = 'Score : ' + score;

}

// Fonction reset 


function reset() {

    //remise à zéro des positions de la précedente partie

    monsterXY = [];
    heroXY = {};
    laserXY = [];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}