import configPackage from "./config.js";

class SnakeBody{
    
    constructor(){
        this.body = [];
    }

    /**
	 * Creates snake body numDefauldNodes nodes 
	 */
	resetBody(){
        this.body = [];
        snake_body.innerHTML = '';

		for (let i = configPackage.numDefaultNodes-1; i >= 0; i--) {
			const newNode = this._getNewNode(0, i);
			this.body.push(newNode);
		}
    }

    getBody(){
        return this.body;
    }

    /**
     * @param {} dirKey -> key of the current direction
     * @returns new head for the snake body 
     */
    getNewHead(dirKey){
        const dPair = this._getDiffPair(dirKey);
        const head = this.body[0];
        let tail = this.body.pop();

		this.savedTailCoors = Object.assign([], [tail.offsetTop, tail.offsetLeft]);

		let topOffset = head.offsetTop;
		topOffset += dPair[0] == 0 ? 0 : dPair[0]*(configPackage.nodeLen+1);

		let leftOffset = head.offsetLeft;
		leftOffset += dPair[1] == 0 ? 0 : dPair[1]*(configPackage.nodeLen+1);

		tail.style.top = topOffset + 'px';
        tail.style.left = leftOffset + 'px';
        
		return tail;
    }

    getSavedTailCoors(){
        return this.savedTailCoors;
    }
    
    /**
     * @returns true if snake body contains coordinates of newHead
     * @param {*} newHead -> node which should be added as a part of the snake 
     */
    isBodyPart(newHead){
		for(let i in this.body){
			let node = this.body[i];
			if(node.offsetLeft == newHead.offsetLeft
				&& node.offsetTop == newHead.offsetTop)
				return true;
		}
		return false;
    }

    pushFront(node){
        this.body.unshift(node);
    }

    pushBack(node){
        this.body.push(node);
    }

    getNode(i){
        if(i < 0 || i >= this.body.length)
            return undefined;
        return this.body[i];
    }

    pushBackNewNode(row, col){
        const addedNode = this._getNewNode(row, col);
        this.body.push(addedNode);
    }


    /************************* Below are private functions /*************************/
        
    
    /**
     * Creates new DOM element, adds in into body
     * @param {*} row -> of board where should be added new node
     * @param {*} col -> of board where should be added new node
     */
    _getNewNode(row, col){
		let newNode = document.createElement('div');
		newNode.className = 'node';
		newNode.style.width = configPackage.nodeLen + 'px';
		newNode.style.height = configPackage.nodeLen + 'px';
		newNode.style.top = row * (1+configPackage.nodeLen) + 'px';
		newNode.style.left = col * (1+configPackage.nodeLen) + 'px';

		snake_body.append(newNode);

		return newNode;
    }
    

    /**
	 * @used for decomposition
	 * @uses Key of current direction
	 * @returns difference bewteen first and possible new node's coordinates
	 */
	_getDiffPair(dirKey){
		switch (dirKey) {
			case configPackage.leftKey	: return [0, -1];
			case configPackage.upKey 	: return [-1, 0];
			case configPackage.rightKey	: return [0, 1];
			case configPackage.downKey	: return [1, 0];

			default :
				console.log("Error occured in getDiffPair -> wrong direction");
				return [];
		}
	}
    
}

export default SnakeBody;