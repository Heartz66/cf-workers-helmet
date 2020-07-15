import * as helmet from 'helmet';
import {promisify} from 'util';

const cfWorkersHelmet = function () {
    const helmetPromise = promisify(helmet.apply(null, arguments));

    return async function (request, response) {
        response.setHeader = function (key, value) {
            this.headers.set(key, value);
        };

        response.removeHeader = function (key) {
            this.headers.delete(key);
        };

        await helmetPromise(request, response);

        return response;
    };
};

export default cfWorkersHelmet;
