export class Auto extends createjs.Bitmap{

    constructor(image) {
        super(image);


        this.vitesse = Math.random() * 2 + 2;

        this.ecouteur = this.avancer.bind(this)
        createjs.Ticker.addEventListener('tick',this.ecouteur)

    }


    avancer(){


        this.x -= this.vitesse;
        if(this.x < -this.getBounds().width-300){
            this.detruire();
        }
    }




    detruire(){
        createjs.Ticker.removeEventListener("tick", this.ecouteur);
        this.parent.removeChild(this);
    }

}