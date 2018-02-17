	var body = document.getElementsByTagName("body")[0];
	const container = document.querySelector('#container');

	var squareSubmit = document.querySelector('.squareSubmit');
	var squareNumber = document.querySelector('.squareNumber');

	var gridSize = 16;
	var isRainbowActive = false;
	var counter = 1;
	var colorArray = ["#F80C12", "#FF4422", "#FEAE2d", 
	"#69D025", "#22CCAA", "#4444DD", "#3B0CBD"];

	const button = document.querySelector('.button');
	button.innerHTML = "Reset grid";
	button.addEventListener ("click", function() {
		resetGrid();
		createGrid();
	});

	const buttonRainbow = document.querySelector('.buttonRainbow');
	buttonRainbow.innerHTML = "Go rainbow!";
	buttonRainbow.addEventListener ("click", function() {
		counter++;
		if (counter % 2 === 0) {
			isRainbowActive = true;
			document.querySelector('.buttonRainbow').style.backgroundColor = "#FEAE2d";
		} else {
			isRainbowActive = false;
			document.querySelector('.buttonRainbow').style.backgroundColor = "#008DCB";
		}
	});

	squareSubmit.addEventListener('click', function() {
		resizeGrid();
	});

	document.querySelector('#container').style.grid = generateString(); 
	createGrid();
	
	function createGrid() {
		for (var i = 0; i < gridSize*gridSize; i++) {
			const unit = document.createElement("div");
			unit.className= "unit";
			container.appendChild(unit);
			unit.addEventListener('mouseover', (e) => {
				if (isRainbowActive) {
					e.target.style.background = createRandomColor();
				} else {
					e.target.style.background = "#2B616D";
				}
			});
		}	
	}

	function createRandomColor() {
	var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
	return randomColor;
	}

	function resizeGrid() {
		gridSize = squareNumber.value;
		while (gridSize < 1 || gridSize > 64 || gridSize % 1 !== 0) {
			gridSize = prompt("Please set the size of the grid (whole number between 1 and 64).");
		}
		gridSize = Math.floor(gridSize);
		document.querySelector('#container').style.grid = generateString();
		resetGrid();
		createGrid();
	}

	function generateString() {
		var columns = "";
		var rows = "";
		for (var i = 0; i < gridSize; i++) {
			rows += "1fr "
			columns += " 1fr"
		}
		rows += "/ ";
		rows = rows.concat(columns);
		return rows;
	}

	function resetGrid() {
		while (container.hasChildNodes()) {
			container.removeChild(container.childNodes[0]);
		}	
	}