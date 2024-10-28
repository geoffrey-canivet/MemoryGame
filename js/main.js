// arrivée div anim
// anim card over

        let depart = false; // autorisation clicks
        let card1Flip;
        let card2Flip;
        let click1 = false;
        let click2 = false;
        let card1;
        let card2;
        let tabImg = ["img0.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img0.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png"];
        let generateCards = function(){// Génère jeu
            tabImg = tabImg.sort(() => Math.random() - 0.5); // Random tab
            for (let i=0;i<16;i++){ // bouche 16X
                $('.img'+i).attr("src", "assets/img/" + tabImg[i]);  
            };
        }
        let tentatives = 0;
        let paires = 0;
        let time = 20;
        let timer;
        let gameOver = false;
        let chrono = function(){
            timer = setInterval(function(){ // Apres 1sec
                time--;
                $('.spanChrono').text(time);
                if (time == 0){
                    clearInterval(timer);
                    depart = false;
                    $('.chrono').css('display','none');
                    $('.perdu').css('display','block');
                    $('.btnRecommencer').css('display','block');
                    
                }else{
                    console.log('ok jeu en cours');
                } 
            }, 1000);
        }
        // Rejouer (simplifié)
        $('.btnRecommencer').click(function(){
            location.reload(true);
        })
        // début jeu
        $('.btnJouer').click(function(){
            $('.btnJouer').css('display','none');
            $('.imgregles').css('display','none'); // supprime regles
            $('.stats').css('display','block'); // ajoute stats
            $('.flip-card-inner').addClass('flip'); // montre les cartes
            setTimeout(function(){ // Apres 3sec
                $('.flip-card-inner').removeClass('flip'); // cache les cartes
                depart = true; // autorise click
                chrono();
            }, 5000);  
        })

        $('.flip-card-inner').click(function(){
            if (depart == true){
                
                if (click1 == false){ // Si 1e click
                    $(this).addClass('flip'); // tourner carte
                    click1 = true; // click +1
                    card1Flip = this; // stock html carte a tourner
                    card1 = this.childNodes; // retrouver src de div enfant
                    card1 = card1[3];
                    card1 = card1.childNodes;
                    card1 = card1[1];
                    card1 = card1.src; // retrouver src de div enfant
                }else{
                    $(this).addClass('flip');
                    click2 = true;
                    card2Flip = this;
                    card2 = this.childNodes; // retrouver src de div enfant
                    card2 = card2[3];
                    card2 = card2.childNodes;
                    card2 = card2[1];
                    card2 = card2.src;   
                }
                if (click2){ // si deux carte ouverte
                    depart = false;
                    if (card1 != card2){ // si carte différente
                        setTimeout(function(){ // Apres 1sec
                            card1Flip.classList.remove("flip"); // flip carte
                            card2Flip.classList.remove("flip");
                            card1, card2 = null; // Reintit img
                            click1 = false; // Reinit nb click
                            click2 = false;
                            tentatives++;
                            $('.spanTentatives').text(tentatives);
                            depart = true;      
                        }, 1000);
                    }else{ // si carte identique
                        card1 = null; // Reintit img
                        card2 = null;
                        click1 = false; // Reinit nb click
                        click2 = false;
                        tentatives++;
                        $('.spanTentatives').text(tentatives);
                        paires++;
                        $('.spanPaires').text(paires);
                        if (paires == 8){
                            //gagné
                            $('.chrono').css('display','none');
                            $('.win').css('display','block');
                            clearInterval(timer);
                        }else{
                            depart = true;
                        }
                        
                    }  
                }
            }else{
                console.log("click bloqué")
            }        
        });            
        generateCards();