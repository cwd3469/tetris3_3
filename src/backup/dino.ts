import './style.css'

//root 
const canvas =<HTMLCanvasElement> document.getElementById('canvas')
const ctx:CanvasRenderingContext2D|null = canvas.getContext('2d')

// root 위치
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//image
const img1 = new Image();
img1.src = '../src/assets/cactus.png'
const img2 = new Image();
img2.src = '../src/assets/dinosaur.png'


interface Position {
    x:number;
    y:number;
    width:number;
    height:number;
    color:string;
    img : HTMLImageElement
}

// 캐릭터 프로토타입 
class Item{
    position;
    constructor(position:Position){
      this.position = position
    }
    draw():void{
        let { x, y, width, height, color ,img} = this.position;
        
        if(ctx != null){
            ctx.fillStyle = color;
            ctx.fillRect(x,y,width,height);
            ctx.drawImage(img,x,y,width,height)
        }
    }  
}

let dinoPosition = {
    x:10,
    y:200,
    width:50,
    height:50,
    color:'white ',
    img:img2
}

const Dino = new Item(dinoPosition)

Dino.draw()

//물리엔진
const physicalEngine = (dino:Item , disorder:Item) =>{
    let xAxis =  disorder.position.x - (dino.position.x + dino.position.width); 
    let yAxis = disorder.position.y - (dino.position.y + dino.position.height);
    if(xAxis < 0 && yAxis < 0){
        ctx?.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animate)
    }
 }


 // 프레임무빙
 let jump = false;
 let timer = 0;
 let Disorders: Item[] = []
 let jumpTimer:number =  0;
 let animate: number;
 
 const frameMovement = () =>{
     animate = requestAnimationFrame(frameMovement);
     timer++;
     ctx?.clearRect(0,0,canvas.width,canvas.height)
     
     if(timer % 60 === 0){
         let DisorderPosition = {
             x:500,
             y:200,
             width:50,
             height:50,
             color:'white',
             img:img1
         }
         const Disorder = new Item(DisorderPosition)
         Disorders.push(Disorder)
     } 
     Disorders.forEach((a,i,o)=>{
        if(a.position.x < 0){
             o.splice(i,1)
        }
        a.position.x--;
         physicalEngine(Dino , a)
         a.draw();
     })
     
     if(jump === true){
         Dino.position.y--;
         jumpTimer++;
     }
     if(jump === false){
         if(Dino.position.y < 200) {
             Dino.position.y++
         }
     }
     if(jumpTimer > 100){
         jump = false;
         jumpTimer = 0;
     }
     Dino.draw()
 }
 
 frameMovement()


 //키보드 조작
document.addEventListener('keydown',(e) =>{
    switch (e.code) {
        case 'Space':
         return jump = true
        default:
            break;
    }
})
