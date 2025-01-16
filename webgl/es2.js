function main(){

	var stats = initStats();

	// Creo la scena, all'interno della quale inserirò luci e oggetti.
	var scene = new THREE.Scene();

	// Creo la telecamera per la scena.
	/*
		THREE.PerspectiveCame( FOV, aspect, near, far)
		FOV = campo visivo,
		aspect = grandezza rispetto al campo
		near = grandezza del cubo di vicinanza del frustum (internet)
		far = grandezza del cubo di lontananza del frustum
	*/

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	// create a render and set the size
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	//+++++++++++++++++++++++  piano d'appoggio  ++++++++++++
	//utilizzio le variabili cube  per le forme cubiche,cylinder per i cilindri e sphere per le sfere per risparmiare memoria
	// Creo piano d'appoggio
	var planeGeometry = new THREE.PlaneGeometry(300,300,1,1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});
	var plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.receiveShadow  = true;
	// posiziono il piano d'appoggio rispetto alla scena 
	plane.position.x=0
	plane.position.y=0
	plane.position.z=0
	// aggiungo alla scena
	scene.add(plane);

	//+++++++++++++++++++++++  base d'appoggio dell'uccello ++++++++++++
	// Creo un cubo
	var cubeGeometry = new THREE.BoxGeometry(166,194,4);
	//Imposto colore tramite codice HEX
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x0000cc});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	// posiziono il rettangolo
	cube.position.x=0;
	cube.position.y=0;
	cube.position.z=0;
	// lo aggiungo alla scena
	scene.add(cube);
	
	// Creo parallelepipedo sinistro della base d'appoggio
	var cubeGeometry = new THREE.BoxGeometry(6,194,52);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	// Posiziono il parallelepipedo
	cube.position.x=-80;
	cube.position.y=0;
	cube.position.z=26;
	//Aggiungo il parallelepipedo alla scena
	scene.add(cube);
	
	// Creo parallelepipedo destro base d'appoggio
	//la progettazione è uguale alla parte sinistra parallelo rispetto all'altro parallelepipedo
	var cubeGeometry = new THREE.BoxGeometry(6,194,52);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	// Posiziono il parallelepipedo
	cube.position.x=80;
	cube.position.y=0;
	cube.position.z=26;
	//Aggiungo il parallelepipedo alla scena
	scene.add(cube);
	
	// Creo l'appoggio del parallelepipedo orizzontale, parte sinistra
	var cubeGeometry = new THREE.BoxGeometry(6,64,386);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	// Posiziono il parallelepipedo nella scena
	cube.position.x=-80;
	cube.position.y=45;
	cube.position.z=193;
	//Aggiungo il parallelepipedo alla scena
	scene.add(cube);
	
	// Creo l'appoggio del cilindro orizzontale, parte destra
	var cubeGeometry = new THREE.BoxGeometry(6,64,386);
	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.castShadow = true;
	// Posiziono il cubo nella scena
	cube.position.x=80;
	cube.position.y=45;
	cube.position.z=193;
	//Aggiungo il cubo alla scena
	scene.add(cube);
	
	//+++++++++++++++++++++++  uccello  ++++++++++++
	// Creo la sfera inferiore dell'uccello
	var sphereGeometry = new THREE.SphereGeometry(58,20,20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x3399FF});
	var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
	//Posiziono la sfera nella scena
	sphere.position.x=0;
	sphere.position.y=45;
	sphere.position.z=160;
	sphere.castShadow=true;
	// Aggiungo la sfera alla scena
	scene.add(sphere);
	
	// Creo la sfera superiore (testa)
	var sphereGeometry = new THREE.SphereGeometry(52,20,20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x3399FF});
	var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
	//Posiziono la sfera nella scena
	sphere.position.x=0;
	sphere.position.y=45;
	sphere.position.z=550;
	sphere.castShadow=true;
	// Aggiungo la sfera alla scena
	scene.add(sphere);
	
	// Creo il cilindro (collo)
	var cylinderGeometry = new THREE.CylinderGeometry(12, 12, 390, 50, 50, false);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x3399FF});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.castShadow = true;
	// posiziono il cilindro
	cylinder.position.x=0;
	cylinder.position.y=45;
	cylinder.position.z=355;
	cylinder.rotation.x=1.57079;
	// Aggiungo il cilindro alla scena
	scene.add(cylinder);		
	
	//+++++++++++++++++++++++  asta orizzontale  ++++++++++++
	// creo il cilindro
	var cylinderGeometry = new THREE.CylinderGeometry(8, 8, 200, 50, 50, false);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.castShadow = true;
	//posiziono il cilindro
	cylinder.position.x=0;
	cylinder.position.y=45;
	cylinder.position.z=355;
	cylinder.rotation.x=1.57079;
	cylinder.rotation.z=1.57079;
	// Aggiungo il cilindro alla scena
	scene.add(cylinder);	
	
	//+++++++++++++++++++++++  cappello  ++++++++++++
	//creo il cilindro
	var cylinderGeometry = new THREE.CylinderGeometry(71, 71, 10, 50, 50, false);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.castShadow = true;
	//posiziono il cilindro
	cylinder.position.x=0;
	cylinder.position.y=45;
	cylinder.position.z=595;
	cylinder.rotation.x=1.57079;
	//// Aggiungo il cilindro alla scena
	scene.add(cylinder);
	
	//creo il cilindro
	var cylinderGeometry = new THREE.CylinderGeometry(40, 40, 70, 50, 50, false);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.castShadow = true;
	//posiziono il cilindro
	cylinder.position.x=0;
	cylinder.position.y=45;
	cylinder.position.z=635;
	cylinder.rotation.x=1.57079;
	// Aggiungo il cilindro alla scena
	scene.add(cylinder);
	
	//+++++++++++++++++++++++  naso  ++++++++++++
	//creo il cilindro
	var cylinderGeometry = new THREE.CylinderGeometry(12, 1, 70, 50, 50, false);
	var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
	var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.castShadow = true;
	//posiziono il cilindro
	cylinder.position.x=0;
	cylinder.position.y=-20;
	cylinder.position.z=550;
	// Aggiungo il cilindro alla scena
	scene.add(cylinder);
	
	//*************************************************
	
	//posiziono e punto la telecamera al centro della scena
	camera.position.x = 0;
	camera.position.y = -900;
	camera.position.z = 100;
	camera.setViewOffset(window.innerWidth,window.innerHeight,0,-300,window.innerWidth,window.innerHeight);
	camera.lookAt(scene.position);

	//aggiungo l'illuminazione
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLight);

	// aggiungo la luce
	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0, -300, 1000 );
	spotLight.castShadow = true;
	scene.add( spotLight );

	// aggiungo l'output del render al html
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	// chiamata della funzione render
	var step=0;

	var controls = new function() 
	{
		this.rotationX = 0.00;
		this.rotationY = 0.00;
		this.rotationZ = 0.00;
	}

	var gui = new dat.GUI();
	gui.add(controls, 'rotationX',0,0.5);
	gui.add(controls, 'rotationY',0,0.5);
	gui.add(controls, 'rotationZ',0,0.5);

	render();

	function render(){
		stats.update();
		//rotazione della camera rispetto agli assi
		camera.rotation.x += controls.rotationX;
		camera.rotation.y += controls.rotationY;
		camera.rotation.z += controls.rotationZ;

		// il render utilizza requestAnimationFrame
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function initStats(){
		var stats = new Stats();

		stats.setMode(0); // 0: fps, 1: ms

		// Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';

		document.getElementById("Stats-output").appendChild( stats.domElement );

		return stats;
	}
};
