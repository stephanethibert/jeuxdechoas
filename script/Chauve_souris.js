import {Projectible} from "./Projectible.js";
export class Chauve_souris extends createjs.Sprite{

    constructor(quelSrite,personnage,jeu) {
        super(quelSrite);
        console.log("a")


        this.personnage =personnage

        this.jeu=jeu

        console.log("b")

        console.log("c")
        this.vitesse = Math.random() * 2 + 2;
        console.log("d")
        this.gotoAndPlay("vivant");
        console.log("e")
        this.ecouteur = this.avancer.bind(this)

        console.log("f")
        createjs.Ticker.addEventListener('tick',this.ecouteur)

    }


    avancer(e){

        if(e.paused) return;

        this.x += this.vitesse;


        if(this.x < -this.getBounds().width){
            this.detruire();
        }

        this.detecter()
    }
    detecter() {
        // Filtrage de la liste d'affichage pour ne retenir que les éléments qui nous intéressent
        let projectiles = this.jeu.stage.children.filter(item => item instanceof Projectible);
        if (ndgmr.checkRectCollision(this.personnage,this)) {

            this.detruire();
            this.jeu.retireVieHeros();
            console.log(this.jeu.retireVieHeros)

        }

        if(projectiles.length>0){


            projectiles.forEach(projectile => {
//         let point = this.ennemi.globalToLocal(projectile.x, projectile.y);
                // Vérification d'une collision entre un projectile et le défenseur
                if (ndgmr.checkRectCollision(projectile,this)) {
                    projectile.detruire();
                    this.detruire();


                }

            })



        }



    }



    detruire(){
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        this.parent.removeChild(this);

        console.log("detruit")
    }

}