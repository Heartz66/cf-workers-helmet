import * as helmet from 'helmet';
import {promisify} from 'util';

const cfWorkersHelmet = function () {
    const helmetPromise = promisify(helmet.apply(null, arguments));

    return async function (request, response) {
        let helmetResponse = new Response(response.body, response);

        helmetResponse.setHeader = function (key, value) {
            this.headers.set(key, value);
        };

        helmetResponse.removeHeader = function (key) {
            this.headers.delete(key);
        };

        await helmetPromise(request, helmetResponse);

        return response;
    };
};

export default cfWorkersHelmet;
