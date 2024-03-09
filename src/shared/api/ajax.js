const BACKEND_URL = 'http://62.233.46.235:8080';

/**
 * Performs ajax request
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {object} queryParams - query GET params for requesst
 * @param {object} body - body for POST request
 * @param {Function} callback - callback function
 * @returns callback return or object with error
 */
export function ajax(method, url, queryParams = null, body = null, callback) {
    let fullUrl = BACKEND_URL + url;
    if (queryParams) {
        const newUrl = new URL(fullUrl);
        Object.entries(queryParams).forEach(param => {
            const [name, value] = param;
            newUrl.searchParams.append(name, value);
        });
        fullUrl = newUrl.toString();
    }

    const headers = {};
    if (body) {
        headers['Content-Type'] = 'application/json; charset=utf8';
    }

    return fetch(fullUrl, {
        method,
        headers,
        credentials: 'include',
        body: body == null ? null : JSON.stringify(body),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const {Data, Status} = data;
            callback(Data, Status);
        }) 
        .catch((error) => {
            const {status, body} = error;
            const parsedBody = body;
            return {status, parsedBody};
        });

}

/**
 * Performs ajax request sending form data
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {HTMLElement} form - html form to send
 * @param {Function} callback - callback function
 * @returns callback return or object with error
 */
export function ajaxMultipartForm(method, url, form, callback) {
    return fetch(BACKEND_URL + url, {
        method,
        credentials: 'include',
        body: new FormData(form),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const {Status, Msg, MsgRus} = data;
            callback(Status, Msg, MsgRus);
        })
        .catch((error) => {
            const {status, body} = error;
            const parsedBody = body;
            return {status, parsedBody};
        })
}
