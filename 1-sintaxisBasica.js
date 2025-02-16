/**
 * Pagina 1 sintaxis 
 * Las funciones de los decoradores se ejecutan cuando se evalua la clase no cuando se instancia la clase
 * 
 */
function logger (value, context){
    console.log("decorator called!")
}

@logger
class Persona {

    weight = 80

    getWeight(){ 
        return this.weight
    }
}
/**
 * Explorando el valor de los parametros value y context
 */

function decorador (value, context){
    /**
     * [Function] {
     * "kind":"class",
     * "name":"Persona"
     * "getMetadata":[Function]
     * "setMetadata":[Function]
     * }
     */
    console.log(value, context)
    /**
     * Esto nos permite tener incluso la oportunidad de ejecutar e instanciar la clase
     */
}

@decorador
class Library {

    index = 80

    getBook(){ 
        return this.book
    }
}