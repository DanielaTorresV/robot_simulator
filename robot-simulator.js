//Editado por Andrés Felipe Zuñiga y Daniela Torres

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const directions = ["east", "west", "north", "south"];

export class Robot {

  /**
   * Establecer posición inicial
   * @param {string} position
   */
  orient(position) {
    if (!directions.includes(position)) {
      throw new InvalidInputError("wrong error");
    } else {
      this.location = position;
    }
  }

  get bearing() {
    return this.location;
  }

  get coordinates() {
    return [this.x, this.y];
  }

  turnRight() {
    if (this.location === "east"){
      this.location = "south";
    } else if (this.location === "west"){
      this.location = "north";
    } else if (this.location === "north"){
      this.location = "east";
    } else if (this.location === "south"){
      this.location = "west";
    }
  }

  turnLeft() {
    if (this.location === "east"){
      this.location = "north";
    } else if (this.location === "west"){
      this.location = "south";
    } else if (this.location === "north"){
      this.location = "west";
    } else if (this.location === "south"){
      this.location = "east";
    }
  }

  /**
   * Establecer coordenadas iniciales (x, y) 
   */
  at(x, y) {
    this.x = x;
    this.y = y;
  }

  advance() {
    if (this.location === "east"){
      this.x++;
    } else if (this.location === "west"){
      this.x--;
    } else if (this.location === "north"){
      this.y++;
    } else if (this.location === "south"){
      this.y--;
    }
  }

  /**
   * Verifica que instrucciones se le dan al Robot 
   */
  static instructions(code) {
    let comands = code.split("");
    let result = [];

    comands.forEach(item => {
      if (item === "L"){
        result.push("turnLeft");
      }
      if (item === "R"){
        result.push("turnRight");
      }
      if (item === "A"){
        result.push("advance");
      }      
    });
    return result;
  }
  /**
   * Establece coordenadas (x, y), y la orientación
   */
  place(place) {
    this.at(place.x, place.y);
    this.orient(place.direction);    
  }
  /**
   * Mover el robot usando comandos
   */
  evaluate(comands) {
    let instructions = Robot.instructions(comands);    
    instructions.forEach(instruction => this[instruction]());
  }
}
