
import {Personnage} from './Personnage.js';
import {Croco} from './Croco.js';
import {Chauve_souris} from './Chauve_souris.js';
import {Pince} from './Pince.js';

import {Ennemi} from "./Ennemi.js";



export class Jeu {
    constructor() {
        this.canvas = document.querySelector("canvas")
        this.viesM = 5;
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.ennemisaucomplet1=this.ajouterEnnemi.bind(this);
        this.ennemisaucomplet2=this.ajouterEnnemi2.bind(this);
        this.ennemisaucomplet3=this.ajouterEnnemi3.bind(this);
        this.ennemisaucomplet4=this.ajouterEnnemi4.bind(this);

        this.temps = 60;
        this.timeoutennemi;
        this.timeoutennemi1;
        this.timeoutennemi2;
        this.timeoutennemiconstucteur;
        this.timeoutennemiautomobile;
        this.chargeur = null;
        this.sol2=500;

        this.parametres = {
            cadence: 60,
            textes: {
                format: "60px 'Pixel'",
                couleur: '#bd7b0b'
            }
        };


        document.fonts.load(this.parametres.textes.format).then( this.iniatiliser.bind(this));


    }

    iniatiliser() {


        this.stage = new createjs.StageGL(this.canvas)
        createjs.Ticker.addEventListener("tick",this.actualiser.bind(this))

        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.framerate = 60;

       this.chargeur=new createjs.LoadQueue();
        console.log()
        this.chargeur.loadManifest("ressources/manifest.json")

        this.chargeur.addEventListener("complete",this.demarer.bind(this))
    }
    actualiser(e){

      this.stage.update(e)

        console.log("tick")


    }
    //pour commencer le persone
    demarer(){


        this.fond=new createjs.Bitmap(this.chargeur.getResult("egout"), true);
        this.stage.addChild(this.fond)



        window.setInterval(this.modifierTemps.bind(this), 1000);

        this.platDroite = new createjs.Bitmap(this.chargeur.getResult('platDroite'), true);
        this.platCentre = new createjs.Bitmap(this.chargeur.getResult('platCentre'), true);
        this.platGauche = new createjs.Bitmap(this.chargeur.getResult('platGauche'), true);
        this.stage.addChild(this.platDroite, this.platCentre, this.platGauche);
        this.platGauche.x = 0;
        this.platCentre.x = this.stage.canvas.width / 2 - this.platCentre.getBounds().width / 2;
        this.platDroite.x = this.stage.canvas.width - this.platDroite.getBounds().width;
        this.platDroite.y = this.platGauche.y = 475;
        this.platCentre.y = this.stage.canvas.height / 3 - 50
        this.texteDebut = new createjs.Text('Survivre niveaux 1!', this.parametres.textes.format, "white");
        this.texteDebut.cache(0, 0, this.texteDebut.getBounds().width, this.texteDebut.getBounds().height);
        this.texteDebut.regX = this.texteDebut.getMeasuredWidth() / 2;
        this.texteDebut.regY = this.texteDebut.getMeasuredHeight() / 2;
        this.texteDebut.x = this.stage.canvas.width / 2 ;
        this.texteDebut.y = this.stage.canvas.height / 2 ;
        this.texteDebut.scale = 0;
        this.ajouterTimer();

        this.stage.addChild(this.texteDebut);
        setTimeout(this.animDebut.bind(this), 1500);

    }



    //pour commencer le deuxieme niveaux

    demarer2(){



        this.ajoutebackground();
        this.ajoutesol();
        this.quelleFonctionEcouteur1 = (this.actualisersol.bind(this));

        this.quelleFonctionEcouteur2 = (this.actualiser.bind(this));


        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur1);
        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur2);

        this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);


        window.addEventListener("keydown", this.ecouteurTouchePesee);

        window.addEventListener("keyup", this.gererToucheRelache.bind(this));


        this.texteDebut = new createjs.Text('Survivre niveaux 2!', this.parametres.textes.format, "black");
        this.texteDebut.cache(0, 0, this.texteDebut.getBounds().width, this.texteDebut.getBounds().height);
        this.texteDebut.regX = this.texteDebut.getMeasuredWidth() / 2;
        this.texteDebut.regY = this.texteDebut.getMeasuredHeight() / 2;
        this.texteDebut.x = this.stage.canvas.width / 2 ;
        this.texteDebut.y = this.stage.canvas.height / 2 ;
        this.texteDebut.scale = 0;

        this.ajouterTimer();
        this.stage.addChild(this.texteDebut);
        setTimeout(this.animDebut2.bind(this), 1500);


    }
    //animer le premier texte

    animDebut(){
        this.animationDebut = createjs.Tween
            .get(this.texteDebut)
            .to({scale:1}, 500, createjs.Ease.cubicInOut)
            .wait(500)
            .to({scale:0}, 500, createjs.Ease.cubicInOut);

        setTimeout(this.commencerJeu.bind(this), 1000);



    }

    //animer le deuxieme texte
    animDebut2(){
        this.animationDebut = createjs.Tween
            .get(this.texteDebut)
            .to({scale:1}, 500, createjs.Ease.cubicInOut)
            .wait(500)
            .to({scale:0}, 500, createjs.Ease.cubicInOut);

        setTimeout(this.commencerJeu2.bind(this), 1000);



    }
//ajouter le temps

    ajouterTimer() {
        this.seconde = new createjs.Text(this.temps,this.parametres.textes.format,"black");
        this.seconde.regX = this.seconde.getMeasuredWidth() / 2;
        this.seconde.x = 640;
        this.seconde.y = 25;
        this.seconde.cache(0, 0, this.seconde.getBounds().width + 500, this.seconde.getBounds().height);
        this.stage.addChild(this.seconde);
    }
    //pourr descendre le temps
    modifierTemps() {
        this.seconde.text = this.temps--;

        this.seconde.updateCache();

        if (this.viesM === 0) {
            this.terminer2();
        }

        else  if (this.temps === 30) {
            this.terminer();

        }
        else if (this.temps===0){
            this.terminer2()
            this.gagner()
        }
    }

    //pour demarer le premier niveaux
    commencerJeu(){

        this.conteneurEnnemis = new createjs.Container();
        this.stage.addChild(this.conteneurEnnemis);
        this.conteneurEnnemis1 = new createjs.Container();
        this.stage.addChild(this.conteneurEnnemis1);
        this.conteneurEnnemis2 = new createjs.Container();
        this.stage.addChild(this.conteneurEnnemis2)
        setTimeout(this.ajouterPersonnage.bind(this), 3000);
        this.timeoutennemi= setTimeout(this.ennemisaucomplet1,5000);
        this.timeoutennemi1=setTimeout(this.ennemisaucomplet2,5000);
        this.timeoutennemi2=setTimeout(this.ennemisaucomplet3,5000);
        setTimeout(this.vieHeros.bind(this), 100);
    }

    //pour demarer le deuxieme niveaux
    commencerJeu2(){
        this.conteneurauto = new createjs.Container();
        this.stage.addChild(this.conteneurauto)
        this.conteneurEnnemis3 = new createjs.Container();
        this.stage.addChild(this.conteneurEnnemis3)
        setTimeout(this.ajouterPersonnage.bind(this), 3000);
        this.timeoutennemiconstucteur= setTimeout(this.ennemisaucomplet4,5000);
    setTimeout(this.vieHeros.bind(this), 100);


    }


    //pour activer le ecran de gagnant


 gagner(){
     this.personnage.detruire()
     clearTimeout(this.timeoutennemiconstucteur);
     this.gagnerecran=new createjs.Bitmap(this.chargeur.getResult("ecranvictoire"), true);
     this.stage.addChild(this.gagnerecran)

 }

    //ajouter les crocodiles


    ajouterEnnemi() {

        if(!createjs.Ticker.paused){
            let ennemi = new Croco(this.chargeur.getResult("croco"),this.personnage, this);
            ennemi.x =-100;
            ennemi.y = 650;
            this.conteneurEnnemis.addChild(ennemi);
        }

        this.timeoutennemi1=setTimeout(this.ennemisaucomplet1, Math.random() * 2000 + 2000);

    }


    //ajouter les chauve souris
    ajouterEnnemi2() {

        if(!createjs.Ticker.paused){
            let ennemi2 = new Chauve_souris(this.chargeur.getResult("chauvesouris"),this.personnage,this);
            ennemi2.x =-100
            ennemi2.y = 150
            this.conteneurEnnemis2.addChild(ennemi2);
        }

        this.timeoutennemi2=setTimeout(this.ennemisaucomplet2, Math.random() * 2000 + 2000);

    }


    //ajouter les pinces
    ajouterEnnemi3() {

        if(!createjs.Ticker.paused){
            let ennemi1 = new Pince(this.chargeur.getResult("pince"),this.personnage,this);
            ennemi1.x = Math.floor(Math.random() * this.stage.canvas.width);
            ennemi1.y=600;
            this.conteneurEnnemis1.addChild(ennemi1);
        }

        this.timeoutennemi=setTimeout(this.ennemisaucomplet3, Math.random() * 2000 + 2000);

    }










//ajouter les constucteur

    ajouterEnnemi4() {

        if(!createjs.Ticker.paused){
            let ennemi4 = new Ennemi(this.chargeur.getResult("ennemis"),this.personnage, this);
            ennemi4.x = this.stage.canvas.width + ennemi4.getBounds().width;

            ennemi4.y =this.sol2
            this.conteneurEnnemis3.addChild(ennemi4);
        }

        this.timeoutennemiconstucteur=setTimeout(this.ajouterEnnemi4.bind(this), Math.random() * 2000 + 2000);

    }

    //ajouter le personnage principale



    ajouterPersonnage() {
        this.personnage = new Personnage(this.chargeur.getResult('heros'),this.platDroite, this.platCentre, this.platGauche);

        this.personnage.x =150;
        this.personnage.y = this.sol2;

        this.stage.addChild(this.personnage);

    }

    //pour enlenver les vies

    retireVieHeros() {
        this.viesM--;
        console.log(this.viesM);
        if(this.viesM===4){
            this.stage.removeChild(this.vie55);
        }else if(this.viesM===3){
            this.stage.removeChild(this.vie44);
        }else if(this.viesM===2){
            this.stage.removeChild(this.vie33);
        }else if(this.viesM===1){
            this.stage.removeChild(this.vie22);
        }else if(this.viesM===0){
            this.stage.removeChild(this.vie11);
            this.personnage.addEventListener("animationend", () => {
                this.stage.removeChild(this.personnage);


                this.terminer2()
                this.ecranDefaite();

            });
        }



    }
//les vies heros

    vieHeros() {
        console.log(this.viesM);
        this.vie11 = new createjs.Sprite(this.chargeur.getResult("coeur"));
        this.stage.addChild(this.vie11);
        this.vie11.gotoAndPlay("coeur");
        this.vie11.x = 0;
        this.vie11.y = 0;


        this.vie22 = new createjs.Sprite(this.chargeur.getResult("coeur"));
        this.stage.addChild(this.vie22);
        this.vie22.gotoAndPlay("coeur");
        this.vie22.x = 100;
        this.vie22.y = 0;


        this.vie33 = new createjs.Sprite(this.chargeur.getResult("coeur"));
        this.stage.addChild(this.vie33);
        this.vie33.gotoAndPlay("coeur");
        this.vie33.x =200;
        this.vie33.y = 0;

        this.vie44 = new createjs.Sprite(this.chargeur.getResult("coeur"));
        this.stage.addChild(this.vie44);
        this.vie44.gotoAndPlay("coeur");
        this.vie44.x = 300;
        this.vie44.y =0;
        this.vie55 = new createjs.Sprite(this.chargeur.getResult("coeur"));
        this.stage.addChild(this.vie55);
        this.vie55.gotoAndPlay("coeur");
        this.vie55.x = 400;
        this.vie55.y = 0;
    }



    //
    //pour regarder si les boutons sont touchers
    gererTouchePesee(e) {

        if (e.key === 'ArrowRight') {
            this.mouvement = 'droite';


        } else if (e.key === 'ArrowLeft') {
            this.mouvement = 'gauche';

        }

    }
    //ecran de defaite
    ecranDefaite(){

        this.defaite= new createjs.Bitmap(this.chargeur.getResult('defaite'), true);
        this.defaite.x=0;
        this.y=500;
        this.stage.addChild(this.defaite);
        console.log("perdu");
        this.boutonReessayer()

    }
    //pour perdre daans le premier niveaux

    terminer(){


        this.personnage.detruire()
        clearTimeout(this.timeoutennemi);
        clearTimeout(this.timeoutennemi1);
        clearTimeout(this.timeoutennemi2);
        this.stage.removeChild(this.platCentre);
        this.stage.removeChild(this.platDroite);
        this.stage.removeChild(this.platGauche);

        for (let i=0; i < this.conteneurEnnemis.children.length ; i++){

            this.conteneurEnnemis.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis2.children.length; i++){

            this.conteneurEnnemis2.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis1.children.length ; i++){

            this.conteneurEnnemis1.children[i].detruire()


        }
        for (let i=0; i < this.conteneurEnnemis.children.length ; i++){

            this.conteneurEnnemis.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis2.children.length; i++){

            this.conteneurEnnemis2.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis1.children.length ; i++){

            this.conteneurEnnemis1.children[i].detruire()


        }



        this.demarer2()


    }
    //pour perdre dans le deuxieme niveaux
    terminer2(){

        this.personnage.detruire()
        clearTimeout(this.timeoutennemi);
        clearTimeout(this.timeoutennemi1);
        clearTimeout(this.timeoutennemi2);
        this.stage.removeChild(this.platCentre);
        this.stage.removeChild(this.platDroite);
        this.stage.removeChild(this.platGauche);

        for (let i=0; i < this.conteneurEnnemis.children.length ; i++){

            this.conteneurEnnemis.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis2.children.length; i++){

            this.conteneurEnnemis2.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis1.children.length ; i++){

            this.conteneurEnnemis1.children[i].detruire()


        }
        for (let i=0; i < this.conteneurEnnemis.children.length ; i++){

            this.conteneurEnnemis.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis2.children.length; i++){

            this.conteneurEnnemis2.children[i].detruire()


        }     for (let i=0; i < this.conteneurEnnemis1.children.length ; i++){

            this.conteneurEnnemis1.children[i].detruire()


        }



    }


    //recomencer le jeux



    boutonReessayer(){
        this.btnReessayer= new createjs.Bitmap(this.chargeur.getResult('boutonreessayer'), true);
        this.btnReessayer.x=500;
        this.btnReessayer.y=550;
        this.stage.addChild(this.btnReessayer);




        this.btnReessayer.addEventListener("click", () => {
            window.location.reload();




        });
    }

    //faire le sol bouger avec le personnage

    ajoutesol() {


        this.solrue = [
            new createjs.Bitmap(this.chargeur.getResult("sol"), true),
            new createjs.Bitmap(this.chargeur.getResult("sol1"), true)
        ];
        this.solrue[0].x = 0;
        this.solrue[1].x = 10403;



        this.solrue[0].y = this.stage.canvas.height - this.solrue[0].getBounds().height + 40 ;
        this.solrue[1].y = this.stage.canvas.height - this.solrue[1].getBounds().height +40;
        this.stage.addChild(this.solrue[0], this.solrue[1]);

        this.quelleFonctionEcouteur1 = (this.actualisersol.bind(this));


        this.quelleFonctionEcouteur2 = (this.actualiser1.bind(this));


        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur1);
        createjs.Ticker.addEventListener("tick", this.quelleFonctionEcouteur2);


    }
    //faire le arrire plan bouger avec le personnage
    ajoutebackground() {


        this.background = [
            new createjs.Bitmap(this.chargeur.getResult("background0"), true),
            new createjs.Bitmap(this.chargeur.getResult("background1"), true)
        ];

        this.background[0].x = 0;
        this.background[1].x = 6741;


        this.stage.addChild(this.background[0], this.background[1]);


    }


    //actualiser larrie plan
    actualiser1(e) {
        if (this.mouvement === 'droite') {
            this.background.forEach(function (element) {
                element.x -= 12;
                console.log("hello")
            });


            if (this.background[0].x + this.background[1].image.width < 0) {
                this.background[0].x = this.background[1].x + 6741;
                this.background.push(this.background.shift())

            }

        } else if (this.mouvement === 'gauche') {

            this.background.forEach(function (element) {
                element.x += 12;

            });
            if (this.background[0].x > 0) {

                this.background[1].x = this.background[0].x - this.background[1].image.width;
                this.background.unshift(this.background.pop())

            }
        }


    }

    //actualsier le sol
    actualisersol(e) {
        if (this.mouvement === 'droite') {
            this.solrue.forEach(function (element) {
                element.x -= 12;
                console.log("hello")
            });


            if (this.solrue[0].x + this.solrue[1].image.width < 0) {
                this.solrue[0].x = this.solrue[1].x + 10403;
                this.solrue.push(this.solrue.shift())

            }

        } else if (this.mouvement === 'gauche') {

            this.solrue.forEach(function (element) {
                element.x += 12;

            });
            if (this.solrue[0].x > 0) {

                this.solrue[1].x = this.solrue[0].x - this.solrue[1].image.width;
                this.solrue.unshift(this.solrue.pop())

            }
        }

        else
        if(this.personnage){


            this.personnage.stop()


        }


    }



    gererToucheRelache(e) {

        if (e.key ==='ArrowRight' || e.key ==='ArrowLeft'){


            this.mouvement=undefined;


        }
    }












}