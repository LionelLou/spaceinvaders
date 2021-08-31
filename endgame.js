// Fonction fin de partie

function endGame(end) {

    isGameStarted = false;
    clearInterval(myInterval);
    

    if (end == 'lose') {

        let text = "Vie : ";
        for (let i = 1; i <= status.life; i++) {

            text += '<i class="bi bi-heart-fill"></i>';

        }
        document.getElementById('life').innerHTML = text;

        audioGameOver.play(); // audio pour la défaite 

        if (status.life == 0) {

            
            alert(' Vous avez Perdu ! ');
            alert(' Votre score est de : ' + status.score + ' points ');

            //TO-DO Ajouter une fonction pour rentrer le score s'il est dans le top 10 
            
            if (confirm(' Voulez vous recommencer une partie ? ')){

                window.location.reload();// rafraichit la page

            }else{

                reset();

            }


        } else {

            alert('Dommage ! Il vous reste encore ' + status.life + ' vie(s) !')
            reset();

        }

    } else if (end == 'win') {

        audioWin.play(); // son de la victoire

        alert(' Bravo ! Vous avez gagné ! ');
            
        if( confirm('Voulez vous continuer à jouer ?' )){

            reset();
            barSetup(status.life, status.stage, status.score );

        }else{

            reset();
            //TO-DO ajouter la possibilité de noter son score s'il est dans le TOP 10 
            
        } 
        
    }
}
