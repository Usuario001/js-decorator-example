/**
 * Pagina 5 Ejemplo básico de una cache 
 */
 let __CACHE___ = {}
 const cacheDecorator = (cacheKey) => function (value, {name,kind}){
    if(kind === 'method'){
        return function (...args){
            if(__CACHE___[cacheKey]) return __CACHE___[cacheKey]
            const returnedValue = value.call(this, ...args)
            __CACHE___[cacheKey] = returnedValue
            return returnedValue
        }
    }
}

class Persona {
    weight = 80

    @cacheDecorator('peso') //"peso" puede ser lo que sea incluso no usar el parametro y usar el nombre del metodo
    getWeight(){
        console.log("se ha ejecutado lo de adentro") //<---- esto solo se deberá ejecutar una vez
        return this.weight
    }

    @cacheDecorator
    get peso() { return this.weight}

    set peso(value) {this.weight = value}

    @cacheDecorator
    getFromDatabaseWeight(){
    }
}

const pe = new Persona;
pe.getWeight(); //Solo al llamarlo aquí se imprimirá el console.log
pe.getWeight();
pe.getWeight();
pe.getWeight();
pe.getWeight();

/**
 * Notas:
 * 1. Existen algo que se llaman accessors que se usan para las propiedades
 * 2. En typeScript existe la posibilidad de hacer un decorador de un parametro de una función 
 * 3. Se pueden usar multiples decoradores al mismo tiempo por ejemplo: 
 * @logger
 * @cacheDecorator
 * @tracker
 * getWeight(){
 * return weight
 * }
 *
 */