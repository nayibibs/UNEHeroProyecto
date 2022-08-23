let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")

//imagenes
const Imgalberto = new Image()
Imgalberto.src = "../imagenes/alberto.png"

const bichoImg = new Image()
bichoImg.src = "../imagenes/bichos1.png"

const rayoImg = new Image()
rayoImg.src = "../imagenes/rayo.png"
console.log(rayoImg)

const bichitos = []
const rayos = []

// Crear personaje
class Alberto{
    constructor(x,y,w,h,imagen,vida,){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagen = imagen;
        this.vida= vida;
        this.saltando = true
        this.score = 0;
            
    }

avanzar(){
    console.log("avanzar")
    this.x +=5;
    
}

retroceder(){ 
    if(this.x > 0){
    this.x -=15;
}

}

saltar(){
    if(this.x < 10){
        this.saltando = true;
    }

}

dibujarse(){
    //ctxfillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
}

morirse(){}
disparar(){
    console.log("si dispara")
    const rayitos= new Rayo(this.x + this.w, this.y + 10, 80, 100, rayoImg)
    rayos.push(rayitos)
    console.log(rayos)
    
}
}


//crear nuestro enemigo --> bicho
class Bicho{
    constructor(x,y,w,h,imagen,nivel){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagen = imagen;
        this.nivel = nivel

    }
    dibujarse(){
        //ctx.fillRect(this.x, this.y, this.w,this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w,this.h);
        if(this.nivel === "facil"){
            this.x -=2;
        }else{
            this.x-= 3;
        }
               
    }
}

//Proyectil rayo

class Rayo{
    constructor(x,y,w,h,imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagen = imagen;
        

    }
    dibujarse(){
        //ctx.fillRect(this.x, this.y, this.w,this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w,this.h);
        this.x += 2;
                       
    }
}


function mostrarDatos(distancia, score,vida){
    ctx.fillStyle = "black";
    ctx.font = "35px ArialBold";
    ctx.fillText("UNE Hero", 600,80);
    ctx.fillText(`Vida: ${vida}`, 800, 80);
    ctx.fillText(`Score: ${score}`, 1000, 80);
    
      
    
}


//Escuche las teclas

function teclas(alberto){
       document.addEventListener("keyup",(evento) => {
        //console.log("Tecla tocada", evento.code);
        switch(evento.code){
            case "KeyF":
                alberto.disparar();
                console.log("disparar")
                break;
            case "Space":
                alberto.saltar();
                break;
            case "ArrowRight":
                alberto.avanzar();
                break;
            case "ArrowLeft":
                alberto.retroceder();
                break;
            
        }
       
    });
}

function crearBicho(){
    const num = Math.floor(Math.random() * 100);
        if(num === 5){
        const bicho = new Bicho(1366, 500, 240, 200, bichoImg, "facil")
        bichitos.push(bicho);
        console.log(bichitos)
    }

}

function iniciarJuego(){
    let distancia = 0;
    const alberto = new Alberto(0, 0, 240, 200, Imgalberto, 100)
    teclas(alberto);
    //console.log(alberto);
    alberto.dibujarse();

    //aqui se reedibuja el videojuego

    setInterval(() => {
        ctx.clearRect(0,0,1366, 625);
        //mostrar datos
        mostrarDatos(distancia,alberto.score, alberto.vida);
        distancia += 1;
       
      
        alberto.dibujarse();
        
        //esta saltando? y "gravedad"
        if(alberto.saltando === true){
            console.log("saltando");
            //altura maximo de salto
            if(alberto.y > 0){
                alberto.y -= 15;
                alberto.x += 5;   
            }else{alberto.saltando = false; 

            }
           
        }

        //no esta saltando
        if(alberto.saltando === false && alberto.y < 450){
            alberto.y += 10;
        }
        //dibujar enemigos/elementos extras
        bichitos.forEach((bicho, index) =>{
            bicho.dibujarse();
            if(bicho.x <= alberto.x + alberto.w){
                //eliminar el elemento bichitos
                //array.splice
                bichitos.splice(index,1);
                alberto.vida -= 25;
                //si sigue vivo alberto
                if(alberto.vida < 100){
                   //alert("murio")
                }
            }
        });
        
        rayos.forEach((rayitos) =>{
            rayitos.dibujarse()
        })

        

        crearBicho();
    }, 1000/50);

}

iniciarJuego();
