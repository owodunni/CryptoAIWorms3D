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
        this.updatePos(x,y,z);
        this.x += Math.floor(Math.random() * 3 - 1)
        this.y += Math.floor(Math.random() * 3 - 1)
        this.z += Math.floor(Math.random() * 3 - 1)
    }
}


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
        //this.renderer.updateObjects(this.gameObjects);
        this.gameObjects.forEach(gameObj => {
            if(gameObj instanceof Worm){
                gameObj.takeAction(null);
            }
        });
    }
}