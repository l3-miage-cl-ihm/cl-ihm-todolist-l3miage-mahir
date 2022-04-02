import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { create } from 'domain';
import { emit } from 'process';
import { fromEvent } from 'rxjs';


@Component({
    selector: 'app-draw',
    templateUrl: './draw.component.html',
    styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements AfterViewInit {
    private clickX:Array<number>;
    private clickY:Array<number>;
    private clickDrag:Array<boolean>;
    private paint:boolean;
    private canvas!:HTMLCanvasElement;
    private context!:CanvasRenderingContext2D;

    private offsetLeft!:number;
    private offsetTop!:number;
    private colorLine:string = "#FFF";
    private shapeLine:CanvasLineJoin = "round";
    private lineWidth:number = 6; // 6 ou 8

    @Output() update:  EventEmitter<string>;

    ngAfterViewInit() { 
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.offsetLeft = this.canvas.offsetLeft;
        this.offsetTop = this.canvas.offsetTop;
    }

    constructor() { 
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.paint = false;    
        this.update = new EventEmitter();    
    }

    mouseDown(e: MouseEvent) {
        this.reloadOffSet();
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        this.paint = true;

        this.addClick(mouseX, mouseY, false);
        this.draw();
    }

    mouseMove(e: MouseEvent) {        
        this.reloadOffSet();

        if(this.paint){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;

            this.addClick(mouseX, mouseY, true);
            this.draw();
        }
    }

    mouseUp(e: MouseEvent) {
        this.paint = false;
    }

    mouseLeave(e: MouseEvent) {
        this.paint = false;
    }

    
    addClick(x:number, y:number, dragging:boolean): void {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    draw(): void {
        this.reloadOffSet();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.strokeStyle = this.colorLine;
        this.context.lineJoin = this.shapeLine;
        this.context.lineWidth = this.lineWidth;

        for(var i=0; i < this.clickX.length; i++) {      
            this.context.beginPath();           

            if(this.clickDrag[i] && i > 0) {
                this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
            } else {
                this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
            }

            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();

        // document.getElementById("resultIMG")?.setAttribute('src', '');
    }

    exportToIMG(): void {
        let imgSRC = this.canvas.toDataURL("image/png");
        // document.getElementById("resultIMG")?.setAttribute('src', imgSRC);
        this.update.emit(imgSRC); 
    }

    reloadOffSet() {
        this.offsetLeft = this.canvas.offsetLeft;
        this.offsetTop = this.canvas.offsetTop;
    }
}
