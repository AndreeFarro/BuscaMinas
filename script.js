var container = document.getElementById('container');
class Contenedor{
	constructor(nMinas, nNodosH, nNodosV,container){
		this.container = container;
		this.nMinas = nMinas;
		this.nNodosH = nNodosH;
		this.nNodosV = nNodosV;
		this.nodos = new Array(nNodosH);
		this.bloquear = false;
		this.temporizador;
		this.nodoExclusivo=null;
		this.banderas=0;
		for (var i = 0; i < this.nodos.length; i++) {
			this.nodos[i]= new Array(nNodosV);
		}
		this.pixel =64;
		this.crear();		
		this.crearGrid();
		this.llenarGrid();	

	}
	mostrarBanderas(){
		var minas = document.getElementById('minas');
		minas.innerHTML =this.banderas +' 🏴'
	}
	cronometrar(){
		var cont =1;
		var time = document.getElementById('time');
		var Block =this;
		this.temporizador = setInterval(function(){
			time.style.color = '#9df33a'
			if (cont<10) {
				time.innerHTML = '00'+cont;
			}
			else if(cont<100){
				time.innerHTML = '0'+cont;
			}
			else{
				time.innerHTML = cont;
			}	        
	        cont++;
	        if(Block.bloquear) {		        	   	
	            clearInterval(Block.temporizador);
	            time.style.color = 'red';
	        }
	    }, 900); 
	}
	detenerCrono(){
		var time = document.getElementById('time');
		clearInterval(this.temporizador);
		time.innerHTML = '000';
		time.style.color = '#fff';
	}
	resetear(){
		this.detenerCrono();
		document.getElementById('time').innerHTML = '000';
		document.getElementById('time').style.color = '#fff'      
		this.bloquear = false;
		for (var i = 0; i < this.nNodosH; i++) {
			for (var j = 0; j < this.nNodosV; j++) {
				this.nodos[i][j].visible=false;
				this.nodos[i][j].mina=false;
				this.nodoExclusivo=null;
				this.banderas=0;
				this.nodos[i][j].estado=3;
				this.nodos[i][j].valor=0;
				this.nodos[i][j].div.style.background = '#454d55';
				this.nodos[i][j].estados();
			}
		}
		this.mostrarBanderas();
	}
	borrar(){
		var minas = document.getElementById('minas');
		minas.innerHTML =0 +' 🏴'
		this.detenerCrono();
		for (var i = 0; i < this.nNodosH; i++) {
			for (var j = 0; j < this.nNodosV; j++) {
				this.nodos[i][j]= null;
			}
		}
		this.nodos =null;
		this.container.innerHTML ="";
	}
	primerClick(nodoEx){
		this.nodoExclusivo=nodoEx
		for (var a = this.max(0,nodoEx.posX-1); a <= this.min(this.nNodosH-1,nodoEx.posX+1); a++) {
			for (var b = this.max(0,nodoEx.posY-1); b <= this.min(this.nNodosV-1,nodoEx.posY+1); b++) {						
				this.nodos[a][b].mina=true;
			}
		}	
		this.addMinas();		
		this.restaurarNodo();
		this.contabilizar();
		this.cronometrar();
	}
	restaurarNodo(){
		for (var a = this.max(0,this.nodoExclusivo.posX-1); a <= this.min(this.nNodosH-1,this.nodoExclusivo.posX+1); a++) {
			for (var b = this.max(0,this.nodoExclusivo.posY-1); b <= this.min(this.nNodosV-1,this.nodoExclusivo.posY+1); b++) {						
				this.nodos[a][b].mina=false;
			}
		}	
	}
	crear(){
		for (var i = 0; i < this.nNodosH; i++) {
			for (var j = 0; j < this.nNodosV; j++) {
				this.nodos[i][j]=new Nodo(i,j,this);
			}
		}		
	}
	addMinas(){
		for (var i = 0; i < this.nMinas; i++) {
			var xm=Math.floor(Math.random() * this.nNodosH);
			var ym=Math.floor(Math.random() * this.nNodosV);
			
			while(this.nodos[xm][ym].mina){
				xm=Math.floor(Math.random() * this.nNodosH);
				ym=Math.floor(Math.random() * this.nNodosV);				
			}
			this.nodos[xm][ym].mina =true;
			//this.nodos[xm][ym].div.innerHTML ='☢'

		}
	}
	contabilizar(){
		for (var i = 0; i < this.nNodosH; i++) {
			for (var j = 0; j < this.nNodosV; j++) {

				if(this.nodos[i][j].mina){
					this.nodos[i][j].valor--;
				}
				
				for (var a = this.max(0,this.nodos[i][j].posX-1); a <= this.min(this.nNodosH-1,this.nodos[i][j].posX+1); a++) {
					for (var b = this.max(0,this.nodos[i][j].posY-1); b <= this.min(this.nNodosV-1,this.nodos[i][j].posY+1); b++) {						
						if(this.nodos[a][b].mina){
							this.nodos[i][j].valor++;
						}
					}
				}				
			}
		}
	}
	crearGrid(){
		if(this.nNodosH>8){this.pixel=this.pixel/2;}
		
		let gridFilas=`${this.pixel}px`;
		let gridColumns=`${this.pixel}px`;

		for(let i=1;i<this.nNodosH;i++){gridFilas+=` ${this.pixel}px`;}
		for(let j=1;j<this.nNodosV;j++){gridColumns+=` ${this.pixel}px`;}
		
		this.container.style.gridTemplateColumns=gridColumns;
		this.container.style.gridTemplateRows=gridFilas;
	}
	llenarGrid(){
		var container = this.container;
		this.nodos.map(a=>{
			a.map(e=>{
			this.container.appendChild(e.div);
			})
		})
	}
	expansion(nodoCl){
		nodoCl.visible=true;
		nodoCl.div.style.background = '#343a40';
		if(nodoCl.mina){
			nodoCl.div.innerHTML ='☢'
		}else{
			nodoCl.mostrar();						
			if(nodoCl.valor==0){
				for (var a = this.max(0,nodoCl.posX-1); a <= this.min(this.nNodosH-1,nodoCl.posX+1); a++) {
					for (var b = this.max(0,nodoCl.posY-1); b <= this.min(this.nNodosV-1,nodoCl.posY+1); b++) {						
						if(!this.nodos[a][b].visible && this.nodos[a][b].estado<1){
							this.expansion(this.nodos[a][b]);
						}
					}
				}
			}
		}		
	}
	max(a,b){if(a<b){return b;}return a;}
	min(c,d){if(c<d){return c;}return d;}

	detonar(nodoMina){
		if(nodoMina.mina && nodoMina.estado<1){
			for (var i = 0; i < this.nNodosH; i++) {
				for (var j = 0; j < this.nNodosV; j++) {
					if(this.nodos[i][j].mina){
						if(this.nodos[i][j].estado==1){
							this.nodos[i][j].div.innerHTML ='🏴';
						}else{
							this.nodos[i][j].div.innerHTML ='☢';
						}						
					}
					else if(this.nodos[i][j].estado==1){
						this.nodos[i][j].div.innerHTML ='🎌';
					}

				}
			}
			this.bloquear=true;
		}
		return this.bloquear;
	}
}

class Nodo{
	constructor(x,y,contenedorMina){
		this.visible =false
		this.posX = x;
		this.posY = y;
		this.mina = false;
		this.valor = 0;
		this.estado = 0;
		this.div = document.createElement('div');
		this.div.style.width = `100%`;
		this.div.style.height = `100%`;	
		this.div.classList.add('nodo');
		this.contAux = contenedorMina;
		var auxNodo = this;

		this.div.addEventListener('click',()=>{
			if(contenedorMina.nodoExclusivo==null) {
				contenedorMina.primerClick(this);
			}			
			contenedorMina.detonar(this);
			if(this.estado==0 && !contenedorMina.bloquear){
				contenedorMina.expansion(auxNodo);	
			}
		})
		this.div.addEventListener('auxclick',()=>{
			if(!this.visible &&!contenedorMina.bloquear){
				this.estado++;
				this.estados();
			}

		})
	}
	mostrar(){if (this.estado==0) {this.div.innerHTML = this.valor;}}
	estados(){
		switch (this.estado) {
			case 1:	this.div.innerHTML = '🏴';this.contAux.banderas++ ;break;
			case 2:	this.div.innerHTML = '?';this.contAux.banderas-- ;break;
			case 3:	this.div.innerHTML ='';this.estado = 0;break;
		}
		this.contAux.mostrarBanderas();
	}
}

var buscaMina = new Contenedor(40,16,16,container);

let resetear = document.getElementById('resetear');
let principiante = document.getElementById('principiante');
let intermedio = document.getElementById('intermedio');
let avanzado = document.getElementById('avanzado');

resetear.addEventListener('click',()=>{buscaMina.resetear();})
principiante.addEventListener('click',()=>{change(10,8,8);})
intermedio.addEventListener('click',()=>{change(40,16,16);})
avanzado.addEventListener('click',()=>{change(99,16,31);})

function change (minas,x,y) {
	buscaMina.borrar();
	buscaMina = null;
	buscaMina = new Contenedor(minas,x,y,container); 
}



