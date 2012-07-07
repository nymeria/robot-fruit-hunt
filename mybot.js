
function new_game() {
}

function make_move() {	
	var board = get_board();
	var currentPositionX = get_my_x();
	var currentPositionY = get_my_y();

	if(shouldTakeFruit(board[currentPositionX][currentPositionY])){
		return TAKE;
	}

	//nothing is visited at the beginning of a move
	var visitedCells = new Array(WIDTH);
	for(var i=0; i<WIDTH; i++){
		visitedCells[i] = new Array(HEIGHT);
		for(var j=0; j<HEIGHT;j++){
			visitedCells[i][j] = 0;
		}
	}
	
	
	var targetFruit = findFruit(currentPositionX, currentPositionY,board, visitedCells);
	var moveHorizontal = currentPositionX-targetFruit.x;
	if(moveHorizontal > 0){
		return WEST;
	}
	if(moveHorizontal < 0){
		return EAST;
	}

	var moveVertical = currentPositionY-targetFruit.y;
	if(moveVertical > 0){
		return NORTH;
	}
	if(moveVertical < 0){
		return SOUTH;
	}
}

function shouldTakeFruit(fruitType){
	if(fruitType > 0){
		var majority = Math.floor(get_total_item_count(fruitType)/2) + 1;
		//no one won category yet; take it
		if(get_my_item_count(fruitType)	< majority 
				&& get_opponent_item_count(fruitType) < majority){
			return true;
		}
	}
	return false;
}

function findFruit(myX, myY, board, visitedCells){
	var queue = new Array();
	queue.push(new Cell(myX,myY));
	visitedCells[myX][myY]=1;
	var index=0;
	var result=null;

	while(index < queue.length ){
		var neighborsArray = new Array();
		//dequeue and look at everything at this depth 
		//before deciding on a move
		for(var i = 0; i < queue.length; i++){
			var position = queue[i];
			var fruitType = board[position.x][position.y];
			if(shouldTakeFruit(fruitType)){
				if(result==null){
					result=position;					
				}else{
					//one fruit is "better" when there are fewer of it
					if(get_total_item_count(fruitType) < get_total_item_count(board[result.x][result.y])){
						result=position;
					}
				}
			}
			//horizontal neighbors
			for(var neighborX=-1; neighborX<=1;neighborX++){
				if(isValidNeighbor(position.x + neighborX, position.y, visitedCells)){
					addNeighbor(position.x + neighborX, position.y, neighborsArray, visitedCells);
				}
			}
			
			//vertical neighbors
			for(var neighborY=-1; neighborY<=1;neighborY++){
				if(isValidNeighbor(position.x, position.y + neighborY, visitedCells)){
					addNeighbor(position.x, position.y + neighborY, neighborsArray, visitedCells);
				}
			}
	
		}
		
		if(result != null){
			return result;
		}
		//nothing worthwhile to take; next depth
		queue = neighborsArray;
		index = 0;
	}
}


function addNeighbor(positionX, positionY, queue, visitedCells){
		queue.push(new Cell(positionX, positionY));
		visitedCells[positionX][positionY] = 1;
}

function isValidNeighbor(neighborX, neighborY,visitedCells){
	if(neighborX >= 0 && neighborX < WIDTH 
			&& neighborY >= 0 && neighborY < HEIGHT
			&& visitedCells[neighborX][neighborY]==0){
		//trace("isValidNeighbor true: " + neighborX + " " + neighborY + " " + visitedCells[neighborX][neighborY]);
		return true;
	}
	return false;
}

function Cell(x,y){
	this.x = x;
	this.y = y;
}

//Optionally include this function if you'd like to always reset to a 
//certain board number/layout. This is useful for repeatedly testing your
//bot(s) against known positions.

//function default_board_number() {
//return 123;
//}
