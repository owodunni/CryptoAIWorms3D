class Food{
    constructor(x,y,z){
        this.x = x/4;
        this.y = y/4;
        this.z = z/4;
    }
}

class Worm{
    constructor(id,name,dna){
        this.id = id;
        this.name = name;
        this.dna = dna;
    }

    updatePos(x,y,z){
        this.x = x/4;
        this.y = y/4;
        this.z = z/4;    
    }

    takeAction(env){
        var dir = Math.floor(Math.random() * 6)
        this.x += directions[dir][0];
        this.y += directions[dir][1];
        this.z += directions[dir][2];
    }
}

const directions = [
    [-1, 0, 0,],
    [1, 0, 0,],
    [0, -1, 0,],
    [0, 1, 0,],
    [0, 0, -1,],
    [0, 0, 1,]]


class GameEngine {
    constructor(updateGameObjs) {

        GameEngine.prototype.updateGameObjs = updateGameObjs;

        this.gameObjects = [];
    }

    AddFood(food){
        for(var i = 0; i< food.length-3; i+=3){
            this.gameObjects.push(new Food(food[i], food[i+1], food[i+2]));
          }
        console.log("AddFood: " + JSON.stringify(this.gameObjects));
    }

    AddWorms(worms){
        console.log("AddWorms: " + worms);
        worms.forEach(worm => {
            this.gameObjects.push(worm);
        });
    }

    AddWormStartingPos(wormPos){
        var i = 0;
        this.gameObjects.forEach(gameObj => {
            if(gameObj instanceof Worm){
                gameObj.updatePos(wormPos[i], wormPos[i+1], wormPos[i+2]);
                i+=3;
            }
        });
        console.log("AddFood: " + JSON.stringify(this.gameObjects));
    }

    init(){
        this.updateGameObjs(this.gameObjects);
    }

    Update(){
        this.updateGameObjs(this.gameObjects);
        this.gameObjects.forEach(gameObj => {
            if(gameObj instanceof Worm){
                gameObj.takeAction(null);
            }
        });
    }
}