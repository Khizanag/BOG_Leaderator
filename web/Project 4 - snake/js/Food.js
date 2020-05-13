import configPackage from "./config.js";

class Food{

    constructor(){
        this._createFoodElement();
        snake_canvas.append(this.food);
    }

    resetFood(){
		this.food.style.background = 'red';
    }
    
    /**
     * Drops food on the random coordinates on the board
     * @param {*} body -> full body of the snake
     *                 -> is used to find if new food was added on the snake body
     */
    dropFood(body){
		const foodCoords = this._getNewFoodCoordinates(body);

		const top = foodCoords[0] * (1+configPackage.nodeLen);
		this.food.style.top = top +'px';

		const left = foodCoords[1] * (1+configPackage.nodeLen);
		this.food.style.left = left+'px';
    }
    
    /**
     * Finds if the new head will be collided on the food
     * @param {} newHead ->node which should be added as a part of the snake 
     */
    shouldBeEaten(newHead){
        return newHead.offsetLeft == this.food.offsetLeft
            && newHead.offsetTop == this.food.offsetTop;
    }

    
    /************************* Below are private functions /*************************/


	_createFoodElement(){
		this.food = document.createElement('div');
		this.food.style.width = configPackage.nodeLen+'px';
		this.food.style.height = configPackage.nodeLen+'px';
		this.food.id = 'food';
	}

	/**
	 * @returns array of two numbers, 0th corre
	 */
	_getNewFoodCoordinates(body){
		let x, y;
		do{
			x = Math.floor(Math.random() * configPackage.numNodesInWidth);
			y = Math.floor(Math.random() * configPackage.numNodesInHeight);
		} while(this._includes(body, y, x));
		return [y, x];
    } 	
    
    /**
     * Iterates over the full body and finds if it contains node
     * which's coordinates are y and x
     * @param {*} body -> full body of the snake
     * @param {*} y -> top offset from the upper baseline of the snakes's head
     * @param {*} x -> left offset from the leftmost baseline of the snakes's head
     */
    _includes(body, y, x){
        for(const i in body){
            const node = body[i];

            const nodeY = node.offsetTop  / (configPackage.nodeLen+1);
            const nodeX = node.offsetLeft / (configPackage.nodeLen+1);

            if(y === nodeY && x === nodeX)
                return true;
        }
        return false;
    }
    
}

export default Food;