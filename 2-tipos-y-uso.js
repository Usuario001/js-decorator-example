/**
 * Página 2 Lugares donde podemos usar un decorador
 * class, 
 * propiedad
 * metodo
 * getter
 * setter
 */

function logger(value, context){
    console.log(value, context)
    }
/**
 * El orden no es importante para el dev pero si internamente para su funcionamiento
 */
    
@logger //5. kind class
class Persona {
    @logger // 1. kind = field; en el parametro value de logger te devuelve undefined
    weight = 80

    @logger
    getWeight(){ //4. kind method
        return this.weight
    }

    @logger
    get peso() { return this.weight} //3. kind getter

    @logger
    set peso(value) {this.weight = value} //2. kind setter
}