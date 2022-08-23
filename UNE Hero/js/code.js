let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d")

//imagenes
const Imgalberto = new Image()
Imgalberto.src = "../imagenes/alberto.png"

const bichoImg = new Image()
bichoImg.src = "../imagenes/bichos1.png"

const rayoImg = new Image
rayoImg.src = "../imagenes/rayo-removebg-preview.png"

bichitos = []
rayo = []

// Crear personaje
class Alberto{
    constructor(x,y,w,h, color, imagen){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.imagen = imagen;
    }

avanzar(){
    console.log("avanzar")
}

retroceder(){}

saltar(){}

dibujarse(){
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
}

morirse(){}
disparar(){}
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
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w,this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w,this.h);
        /*if(this.nivel === "facil"){
            this.x -= 1;
        }else{
            this.x-=3
        }*/
       
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
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.w,this.h);
        ctx.drawImage(this.imagen,this.x, this.y, this.w,this.h);
        this.x +=5;           
    }
    
}

function dibujarPiso(){
    ctx.beginPath()
    ctx.moveTo(0,190);
    //ctx.lineTo(350,190);
    ctx.stroke();
    ctx.closePath();
}

function mostrarDatos(distancia){
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("UNE Hero", 150,10);
    
}


dibujarPiso();

//Escuche las teclas

function teclas(alberto){
    //recibimos un evento
    document.addEventListener("keyup",(evento) => {
        console.log("Tecla tocada", evento.code);
        switch(evento.code){
            case "KeyF":
                alberto.disparar();
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
            case "ArrowDown":
                console.log("Arriba");
                break;
            case "ArrowUp":
                console.log("Abajo");
                break;
        }
       
    });
}

function crearBicho(){
    const num = Math.floor(Math.random() * 150);
        if(num === 3){
        const bicho = new Bicho(310,130,30,50, bichoImg,"facil")
        bichitos.push(Bicho);
    }

}

function iniciarJuego(){
    let distancia = 0;
    const alberto = new Alberto(25, 145, 40, 60, "blue", Imgalberto)
    teclas(alberto);
    console.log(alberto);
    alberto.dibujarse();

    //aqui se reedibuja el videojuego

    setInterval(() => {
        ctx.clearRect(0,0,250, 200);
        //mostrar datos
        mostrarDatos(distancia);
        distancia += 1;
       
        dibujarPiso();
        alberto.dibujarse();
        
        //esta saltando? y "gravedad"
        if(alberto.saltando === true){
            console.log("saltando");
            //altura maximo de salto
            if(alberto.y > 20){
                alberto.y -= 15;
                alberto.x += 5;   
            }else{alberto.saltando = false; 

            }
           
        }

        //no esta saltando
        if(alberto.saltando === false && alberto.y < 130){
            alberto.y += 5;
        }
        //dibujar enemigos/elementos extras
        bichitos.forEach((bicho, index) =>{
            //bicho.dibujarse();
            if(bicho.x <= alberto.x + alberto.w){
                //eliminar el elemento bichitos
                //array.splice
                alberto.splice(index,1);
                alberto.vida -= 25;
                //si sigue vivo alberto
                if(alberto.vida < 100){
                    alert("murio")
                }
            }
        });

        rayo.forEach((rayo) => {
           rayo.dibujarse();
        })

        crearBicho();
    }, 1000 / 30);

}

iniciarJuego();
