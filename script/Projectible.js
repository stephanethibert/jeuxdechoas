import {Croco} from "./Croco.js";




export  class Projectible extends createjs.Bitmap {


    constructor(quelleimage,sens,) {


        super(quelleimage);

        console.log("hello");

        this.vitesse = 20;
        this.maMethode = this.actualliser.bind(this);
        // this.persoonage=perssonage
        //
        // this.jeu=jeu



        createjs.Ticker.addEventListener('tick', this.maMethode);
        if (sens === "gauche") {


            this.vitesse = -this.vitesse;
            this.scale=-1;


        }

    }

    actualliser(e) {


        this.x += this.vitesse

        if (this.x > window.innerWidth || this.x < 0) {
        this.detruire();

        }

        // this.detecter()


    }

//
//     detecter() {
//         // Filtrage de la liste d'affichage pour ne retenir que les éléments qui nous intéressent
//         let crocos = this.jeu.stage.children.filter(item => item instanceof Croco);
//
//
//         crocos.forEach(croco => {
//
//         if (ndgmr.checkRectCollision(this.persoonage,croco)) {
//             this.detruire();
//             this.jeu.retireVieHeros();
//
//
//
//         }
//
//
//         })
//
//         if(crocos.length>=0){
//
//
//             crocos.forEach(croco => {
// //         let point = this.ennemi.globalToLocal(projectile.x, projectile.y);
//                 // Vérification d'une collision entre un projectile et le défenseur
//                 if (ndgmr.checkRectCollision(croco,this)) {
//                     croco.detruire();
//                     this.detruire();
//
//
//                 }
//
//             })
//
//
//
//         }
//
// }


    detruire() {
        if(this){


            this.parent.removeChild(this);
            // this.removeAllEventListeners();
            createjs.Ticker.removeEventListener("tick", this.maMethode);
        }


    }



}






