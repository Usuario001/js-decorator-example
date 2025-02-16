/**
 * Pagina 6 ejemplo de un decorador para separar lo importante de un metodo respecto de la operación 
 *
 */

/**
 * 
 * 
 * Versión SIN decoradores
 * 
 * 
 */
class Comics {
    setNetworkStatus(status) {
        console.log(`Network status: ${status}`);
    }

    trackError(error) {
        console.error("Error capturado:", error);
    }

    async getSuperHeroInfo(id) {
        this.setNetworkStatus('loading');
        let result;
        try {
            result = await api.getSuperHeroInfo(id); //<--- lo importante
        } catch (err) {
            this.trackError(err);
        } finally {
            this.setNetworkStatus('idle');
        }
        return result;
    }

    async getSuperHeroes() {
        this.setNetworkStatus('loading');
        let result;
        try {
            result = await api.getAllSuperHeroes(); //<--- lo importante
        } catch (err) {
            this.trackError(err);
        } finally {
            this.setNetworkStatus('idle');
        }
        return result;
    }
}

// Simulación de una API externa
const api = {
    async getSuperHeroInfo(id) {
        return new Promise((resolve) =>
            setTimeout(() => resolve({ info: `Hero info for ${id}` }), 1000)
        );
    },

    async getAllSuperHeroes() {
        return new Promise((resolve) =>
            setTimeout(() => resolve({ info: "All heroes info" }), 1000)
        );
    }
};

// Ejemplo de uso
(async () => {
    const comics = new Comics();
    console.log(await comics.getSuperHeroInfo(1));
    console.log(await comics.getSuperHeroes());
})();

/**
 * 
 * 
 * Versión utilizando los decoradores
 * 
 * 
 */
function handleApiRequest(value, { name, kind }) {
    if (kind === 'method') {
        return async function (...args) {
            this.setNetworkStatus('loading');
            let returnedValue;
            try {
                returnedValue = await value.call(this, ...args);
            } catch (err) {
                this.trackError(err);
            } finally {
                this.setNetworkStatus('idle');
            }
            return returnedValue;
        };
    }

    throw new Error(`handleApiRequest solo puede usarse en métodos, pero se aplicó a ${kind}`);
}

class Comics {
    setNetworkStatus(status) {
        console.log(`Network status: ${status}`);
    }

    trackError(error) {
        console.error("Error capturado:", error);
    }

    @handleApiRequest
    async getSuperHeroInfo(id) {
        return api.getSuperHeroInfo(id); //<--- lo importante
    }

    @handleApiRequest
    async getSuperHeroes() {
        return api.getAllSuperHeroes(); //<--- lo importante
    }
}