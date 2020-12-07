

export class Pince extends createjs.Sprite {

    constructor(quelSrrite2, personnage, jeu) {
        super(quelSrrite2);


        this.persoonage = personnage

        this.jeu = jeu


        this.vitesse = Math.random() * 2 + 2;

        this.ecouterdectecter = this.detecter.bind(this)


        this.ecouteur = this.animer.bind(this)
        this.addEventListener("added", this.ecouteur)
        createjs.Ticker.addEventListener('tick', this.ecouterdectecter)


    }


    animer(e) {


        createjs.Tween
            .get(this, {loop: -1, bounce: true})
            .to({y: this.jeu.stage.canvas.height + 200}, 500, createjs.Ease.cubicInOut)
            .call(this.gotoAndPlay.bind(this, "pinceanime"))


    }

    detecter() {
        // Filtrage de la liste d'affichage pour ne retenir que les éléments qui nous intéressent

        if (ndgmr.checkRectCollision(this.persoonage, this)) {
            this.detruire();
            this.jeu.retireVieHeros();
            console.log(this.jeu.retireVieHeros)
        }

    }


    detruire() {

        createjs.Tween.removeTweens(this);

        createjs.Ticker.removeEventListener("tick", this.ecouterdectecter);
        this.removeEventListener("added", this.ecouteur);

        this.parent.removeChild(this);


    }

}