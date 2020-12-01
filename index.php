<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Busca Minas</title>
	<link rel="stylesheet" href="styles.css">
</head>
<body>	
	<div  id="contenedorPrincipal">	
		<div class="cabeceras">
			<div id="minas">0 🏴</div>
			<h1>Busca Minas!</h1>
			<div id="time">
				000
			</div>
		</div>
		
		<div class="controls">
			<ul class="opciones">	
				<li id="resetear">Resetear</li>
				<li id="principiante">Principiante</li>
				<li id="intermedio">Intermedio</li>
				<li id="avanzado">Avanzado</li>				
			</ul>		
		</div>
		<div style="display: flex;justify-content: center;">
			<div oncontextmenu="return false;" id="container">

			</div>
		</div>
	</div>
	<script type="text/javascript" src="script.js"></script>
</body>
</html>