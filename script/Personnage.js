import {Projectible} from "./Projectible.js";

export class Personnage extends createjs.Sprite {

    constructor(quelSprite,platDroite, platCentre,platGauche,personnage,jeu) {
        super(quelSprite,platDroite,platCentre,platGauche);



        this.sol2 = 85;

        this.persoonage=personnage;

        this.jeu=jeu;

        this.regX = this.getBounds().width ;


        this.platDroite = platDroite;
        this.platCentre = platCentre;
        this.platGauche = platGauche;
        this.peutSauter = true;
        this.canvas = document.querySelector("canvas");
        this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);
        this.ecouteurToucheRelache = this.surveillerToucheRelachee.bind(this);
        this.ecouteuractualiser = this.actualiser.bind(this);



        window.addEventListener("keydown", this.ecouteurTouchePesee);
        window.addEventListener("keyup", this.ecouteurToucheRelache);

        this.position += 10;
        this.vitessepersonnage =20

        createjs.Ticker.addEventListener("tick",this.ecouteuractualiser );
        this.addEventListener("mort",this.detruire.bind(this));

        this.debut();
    }

        debut(){

        this.gotoAndPlay("Impbobile");

            this.x = 500;


            this.y = 85;

        }


    gererTouchePesee(e) {

        if (e.key === "ArrowRight") {


            this.deplacementPer({direction: "right"});


        } else if (e.key === "ArrowLeft") {


            this.deplacementPer({direction: "left"});


        }

        else if (e.key === " ") {
            this.saute();


        } else if (e.key === "Enter") {

            this.tire();
        }
    }





    tire()
    {
        let balle;

        if(this.currentAnimation === "imogauche"){
            this.gotoAndPlay("tiregaucheimo");

            balle = new Projectible("ressources/images/projectile.png", "gauche",this.persoonage,this.jeu)
            balle.x = this.x + 15;
            balle.y = this.y + 70;

        }








        else if (this.currentAnimation === "Impbobile"){


            this.gotoAndPlay("tiredroiteimo");

            balle = new Projectible("ressources/images/projectile.png", "droite",this.persoonage,this.jeu)


            balle.x = this.x + 55;
            balle.y = this.y + 40;

            this.gotoAndStop();



        }


        if(this.currentAnimation === "sautergauche"){
            this.gotoAndPlay("sautergauchetire");

            balle = new Projectible("ressources/images/projectile.png", "gauche",this.persoonage,this.jeu)
            balle.x = this.x + 15;
            balle.y = this.y + 70;

        }







        else if (this.currentAnimation === "sauter"){


            this.gotoAndPlay("sautertirer");

            balle = new Projectible("ressources/images/projectile.png", "droite",this.persoonage,this.jeu)

            balle.x = this.x + 55;
            balle.y = this.y + 40;

            this.gotoAndStop();



        }

        if(this.currentAnimation === "gauchetir")


        {

            balle = new Projectible("ressources/images/projectile.png", "gauche",this.persoonage,this.jeu)


            balle.x = this.x + 15;
            balle.y = this.y + 70;

        }

        else if(this.currentAnimation === "droitetir")


        {

            balle = new Projectible("ressources/images/projectile.png", "droite",this.persoonage,this.jeu)


            balle.x = this.x + 55;
            balle.y = this.y + 40;

        }











        this.stage.addChild(balle)


    }


//colision plateforme

    actualiser(){



        if (this.x >= 300 && this.sol2 === 350 && this.x < this.stage.canvas.width - 350 || this.sol2 === 85 && this.x < 425 || this.sol2 === 85 && this.x > 870) {


            this.sol2 = 595;

            this.tombe()
        }

        let intersectionPlatGauche = ndgmr.checkRectCollision(this, this.platGauche);
        let intersectionPlatCentre = ndgmr.checkRectCollision(this, this.platCentre);
        let intersectionPlatDroite = ndgmr.checkRectCollision(this, this.platDroite);

        if (intersectionPlatGauche) {

            this.sol2 = 350;


            if (this.y <= 350) {

                createjs.Tween
                    .get(this)
                    .to({y: this.sol2}, 300, createjs.Ease.circIn);
                this.peutSauter = true
            }

        }


        if (intersectionPlatDroite) {

            this.sol2 = 350;

            if (this.y <= 350) {


                createjs.Tween
                    .get(this)
                    .to({y: this.sol2}, 300, createjs.Ease.circIn);
                this.peutSauter = true


            }
            this.y = 351
        }


        if (intersectionPlatCentre) {

            this.sol2 = 85;


            createjs.Tween
                .get(this)
                .to({y: this.sol2}, 300, createjs.Ease.circIn);
            this.peutSauter = true

        }

    }


    saute() {
        this.tuFaisaisQuoi = this.currentAnimation;



        if (this.peutSauter === true) {

            this.peutSauter = false;
            this.gotoAndPlay("sauter");
            createjs.Tween
                .get(this)
                .to({y: this.y - 320}, 200, createjs.Ease.quadInOut)

                .call(this.tombe)

        }


    }
    tombe() {
        this.stop();
        createjs.Tween
            .get(this)
            .to({y: this.sol2}, 300, createjs.Ease.circIn)
            .call(this.toucheAuSol)

    }

    toucheAuSol() {
        this.peutSauter = true;
        this.play();

    }


    deplacementPer(message = null) {


        if (message.direction === "right") {
            if (this.currentAnimation === "gauchetir") this.stop();
            if (this.paused) this.gotoAndPlay("droitetir");
            console.log("droite")
            this.x += this.vitessepersonnage;
        } else if (message.direction === "left") {


            if (this.currentAnimation === "droitetir") this.stop();
            if (this.paused) this.gotoAndPlay("gauchetir");


            this.x -= this.vitessepersonnage;


        }


        //--------------------------------------------------------- On empêche le héros de sortir de l'écran
        if (this.x <= -100) {
            this.x = 1290
        }

        else if (this.x >= 1310) {
            this.x = -100
        }



    }


    surveillerToucheRelachee(e)
    {

        if (e.key === 'ArrowRight') {
            this.gotoAndStop(this.currentAnimation);


            this.gotoAndPlay("Impbobile")

        }
        if (e.key === 'ArrowLeft') {

            this.gotoAndStop(this.currentAnimation);

            this.gotoAndPlay("imogauche")

        }
        if (e.key === 'Enter') {

            if (this.currentAnimation === "tiregaucheimo") {




                this.gotoAndStop(this.currentAnimation);

                this.gotoAndPlay("imogauche")
            }
            else if(this.currentAnimation === "imgauche"){

                this.gotoAndStop(this.currentAnimation);

                this.gotoAndPlay("gauchetir")



            }




            else if (this.currentAnimation === "tiredroiteimo") {

                {




                    this.gotoAndStop(this.currentAnimation);
                    this.gotoAndPlay("Impbobile")

                }


            }
            else if(this.currentAnimation === "Impbobile"){

                this.gotoAndStop(this.currentAnimation);

                this.gotoAndPlay("droitetir")



            }


        }
    }
    detruire() {



        window.removeEventListener("keydown", this.ecouteurTouchePesee);
        window.removeEventListener("keyup", this.ecouteurToucheRelache);

        createjs.Tween.removeTweens(this);
        createjs.Ticker.removeEventListener("tick",this.ecouteuractualiser );


    }
}


