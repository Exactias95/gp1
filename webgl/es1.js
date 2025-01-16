var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n' +
'void main() {\n' + 
'   gl_Position = a_Position;\n' + 
'   gl_PointSize = 10.0;\n' + 
'}\n';

var FSHADER_SOURCE = 
'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n' +
'void main() {\n' + 
'   gl_FragColor = u_FragColor;\n' +
'}\n';

//tiene conto del colore attualmente utilizzato
var currentColor = 0; 
//tiene conto delle coordinate dei rettangoli (ogni quattro valori si ottiene un rettangolo)
var g_points = []; 
//tiene conto del colore dei rettangoli
var g_colors = []; 
var vertexBuffer = null;
//memorizza i colori disponibili(con interpolazione dal RGB)
var colors = [ 
		1.0, 1.0, 0.0,1.0,//Giallo
		1.0, 0.0, 0.0,1.0,//Rosso
		0.0, 1.0, 0.0,1.0,//Verde
		0.0, 1.0, 1.0,1.0,//Azzurro
		0.0, 0.0, 1.0,1.0,//Blu
		1.0, 0.0, 1.0,1.0,//Fucsia
		0.545, 0.0, 0.545,1.0,//Magenta
		0.0, 0.0, 0.0, 1.0];//Nero

function main()
{
	//ottengo il  <canvas> da html
	var canvas = document.getElementById('es1');

	//implemento il contesto per WebGL
	var gl = getWebGLContext(canvas);

	//Controllo che il contesto sia caricato/attivo
	if(!gl) 
	{
		console.log('Impossibile caricare contesto WebGL');
		return;
	}

	//Inizializzo gli shaders
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) 
	{
		console.log('Impossibile caricare shaders');
		return;
	}

	//Ottengo la posizione del programma in memoria
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');

	if(a_Position < 0) 
	{
		console.log('Impossibile caricare il programma');
		return;
	}

	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');

	
	//registra una funzione per la gestione del click del mouse
	canvas.onmousedown = function(ev) {click(ev,gl,canvas,a_Position,u_FragColor);}
	//registra una funzione per la gestione della pressione di tasti sulla tastiera
	document.onkeydown = function(ev) {keyPress(ev,gl,a_Position,u_FragColor);}
	
	//specifica il colore per lo sfondo del canvas
	gl.clearColor(1.0,1.0,1.0, 1.0);

	//rende effettive le modifiche della funzione precedente
	gl.clear(gl.COLOR_BUFFER_BIT);
}

//imposta il valore del colore corrente
function setColor(color)
{
	currentColor = color;
}

//registra le coordinate e il colore del rettangolo e disegna la scena
function click(ev,gl,canvas,a_Position,u_FragColor) {
	//x e y sono rispetto a tutto lo schermo
	var x = ev.clientX;
	var y = ev.clientY;
	var rect = ev.target.getBoundingClientRect();
	//calcola le coordinate rispetto alla canavas
	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
	//memorizza le coordinate nell'array g_points
	g_points.push(x);
	g_points.push(y);
	
	var len = g_points.length;

	offset=len%4;
	
	//memorizza il colore del rettangolo appena creato
	if(offset==0)
	{
		g_colors.push(currentColor);
	}

	//disegna il rettangolo appena creato
	Draw(gl,a_Position,u_FragColor);
}

//annulla l'ultimo rettangolo inserito e ridisegna la scena 
function keyPress(ev,gl,a_Position,u_FragColor)
{	
	//Ottengo il codice evento della pressione del tasto
    var kEvent = window.event ? event : ev

    //Se il codice ottenuto corrisponde alla z assieme alla pressione
    //del tasto Ctrl, avvio il ciclo, altrimento ignoro
    if (kEvent.keyCode == 90 && kEvent.ctrlKey)
    {
    	//Rimuovo dall'array dei colori l'ultimo colore immesso
		g_colors.pop();
		//Rimuovo dall'array dei vertici, i vertici dell'ultimo rettangolo immesso
		g_points.pop();g_points.pop();g_points.pop();g_points.pop();
		//ridisegna la scena
		Draw(gl,a_Position,u_FragColor);
	}
}

//disegna la scena
function Draw(gl,a_Position,u_FragColor){
	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = g_points.length;

	offset=len%4;

	//il ciclo scorre quattro posizioni alla volta poichè ogni quattro valori di g_points costituisce un rettangolo
	for(var i = 0; i < len-offset; i+=4) {

		if( !vertexBuffer )
		{
			gl.deleteBuffer(vertexBuffer);
		}

		/*
		g_points[i]  = Coordinata X del primo vertice
		g_points[i+1]= Coordinata Y del primo vertice
		g_points[i+2]= Coordinata X del secondo vertice
		g_points[i+3]= Coordinata Y del secondo vertice
		*/
		vertici = 
			   [
			    g_points[i],  g_points[i+1],
				g_points[i+2],g_points[i+1],
				g_points[i+2],g_points[i+3],
				g_points[i],  g_points[i+3]
			   ];

		var data = new Float32Array(vertici);
		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);

		gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(a_Position);
		
		triangleVertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
		
		//per la selezione del colore del rettangolo attuale dividiamo la i corrente di 4
		j=g_colors[i/4]*4;


		gl.uniform4f(u_FragColor, colors[j], colors[j+1], colors[j+2], colors[j+3]);
		
		//disegna il rettangolo
		gl.drawArrays(gl.TRIANGLE_FAN,0,4);
	}
}