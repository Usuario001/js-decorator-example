/**
 * Pagina 4 hacer un decorator factory y uso de parametros en los decoradores
 */


const loggerFactory = (loggerName) => function (value, {name,kind}){
    if(kind === 'method' || kind === 'getter'){
        return function (...args){
            console.log(loggerName, `called function ${name}`)
            const returnedValue = value.call(this, ...args)
            return returnedValue
        }
    }
}

class Persona {
    weight = 80

    @loggerFactory('Methods')
    getWeight(){
        return this.weight
    }

    @loggerFactory('Getters')
    get peso() { return this.weight}

    set peso(value) {this.weight = value}
}

const persn = new Persona;
const persnWeigh = persn.getWeight();
persn.weight; //para hacer un trigger del getter y ver el console.log de called function
console.log(persnWeigh)