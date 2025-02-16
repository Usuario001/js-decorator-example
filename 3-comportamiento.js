/**
 * Página 3 cambiar comportamiento de un methodo
 */

/**
 * cambiar comportamiento
 * @param {*} value 
 * @param {*} context 
 */
function logger(value, {name, kind}){
    //console.log('decorated called') // <---- se ejecuta en la evaluación
    if(kind === "method" ){ //getWeight
        return function (...args){ // <---se ejecuta cuando llamamos al metodo
            console.log(`Loggin ${name} execution with arguments ${args.join(', ')}`)
            const returnedValue = value.call(this, ...args)
            console.log(`End execution after returning ${returnedValue}`)
            return returnedValue
        } 
    }
}

@logger
class Persona {
    @logger
    weight = 80

    @logger
    getWeight(){
        return this.weight
    }

    @logger
    get peso() { return this.weight}

    @logger
    set peso(value) {this.weight = value}
}

const p = new Persona;
const peso = p.getWeight();
console.log(peso)


/**
 * Nota de ejemplos de uso;
 * Tracking 
 * Cache
 * Profiling por ejemplo en el decorador al llamar al metodo y se pone un console.time(name) console.timeEnd(name)
 * ...
 */