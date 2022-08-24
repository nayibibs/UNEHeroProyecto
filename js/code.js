let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")

//imagenes
const Imgalberto = new Image()
Imgalberto.src = "../imagenes/alberto224.png"

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
    this.x +=5;
    
}

retroceder(){ 
    if(this.x > 0){
    this.x -=15;
}

}

saltar(){
    this.saltando = true;
  

}

dibujarse(){
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
    const alberto = new Alberto(0, 0, 260, 200, Imgalberto, 100)
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
            if(alberto.y >50){
                alberto.y -= 35;
                alberto.x += 35;   
            }else{alberto.saltando = false; 

            }
           
        }

        //no esta saltando
        if(alberto.saltando === false && alberto.y < 450){
            alberto.y += 15;
        }
        //dibujar enemigos/elementos extras
        bichitos.forEach((bicho, index) =>{
            bicho.dibujarse();
            if(bicho.x <= alberto.x + alberto.w &&
                 bicho.x >= alberto.x && 
                 bicho.y <= alberto.y + alberto.h &&
                 bicho.y >= alberto.y){
                //eliminar el elemento bichitos
                bichitos.splice(index,1);
                alberto.vida -= 25;
                //si sigue vivo alberto
                if(alberto.vida === 0 ){
                   alert("GAME OVER")
                }
            }
        });
        
        rayos.forEach((rayitos,rIndex) =>{
            rayitos.dibujarse() 
            bichitos.forEach((bicho, bIndex) => {
          
                if (rayitos.x + rayitos.w >= bicho.x) {
                  // quitar el hueso y el cactus
                  bichitos.splice(rIndex, 1);
                  rayos.splice(bIndex, 1);
                  alberto.score +=10;
                }
              });
        })

        

        crearBicho();
    }, 1000/50);

}

iniciarJuego();
