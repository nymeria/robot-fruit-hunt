function new_game() {
}

function make_move() {	
	var board = get_board();
	var currentPositionX = get_my_x();
	var currentPositionY = get_my_y();

	if(shouldTakeFruit(board[currentPositionX][currentPositionY])){
		return TAKE;
    }

	var closestFruit = findFruit(currentPositionX, currentPositionY,board);
	var moveHorizontal = currentPositionX-closestFruit.x;
	if(moveHorizontal > 0){
		return WEST;
	}else if(moveHorizontal < 0){
		return EAST;
	}

	var moveVertical = currentPositionY-closestFruit.y;
	if(moveVertical > 0){
		return NORTH;
	}else if(moveVertical < 0){
		return SOUTH;
	}
}

function shouldTakeFruit(fruitType){
	if(fruitType > 0){
		var majority = Math.ceil(	get_total_item_count(fruitType)/2);
		if(get_my_item_count(fruitType)	< majority){
			return true;
		}
	}
	return false;
}

function findFruit(myX, myY, board){
	var queue = new Array();
	var result;
	queue.push(new cell(myX,myY));
	var index=0;
	while(index < queue.length ){
		var position = queue[index];
		var fruitType = board[position.x][position.y];
		if(shouldTakeFruit(fruitType)){
			return position;
		}

		addNeighbors(position, queue);
		index++;
	}
}

function addNeighbors(position, queue){
	if(position.x-1>=0){
		queue.push(new cell(position.x-1, position.y));
	}
	if(position.x+1<WIDTH){
		queue.push(new cell(position.x+1, position.y));
	}
	if(position.y-1>=0){
		queue.push(new cell(position.x, position.y-1));
	}
	if(position.y+1<HEIGHT){
		queue.push(new cell(position.x, position.y+1));
	}
}

function cell(x,y){
	this.x = x;
	this.y = y;
}

// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}
