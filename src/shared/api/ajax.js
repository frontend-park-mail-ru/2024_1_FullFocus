const BACKEND_URL = 'http://62.233.46.235:8080';

export function ajax(method, url, queryParams = null, body = null, callback) {
    let fullUrl = BACKEND_URL + url;
    if (queryParams) {
        const newUrl = new URL(fullUrl);
        Object.entries(queryParams).forEach(param => {
            const [name, value] = param;
            newUrl.searchParams.append(name, value);
        });
        fullUrl = newUrl.toString();
        console.log(fullUrl);
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
            console.error(error);
            return {status, parsedBody};
        });

}

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
            console.log(data);
            const {Status, Msg, MsgRus} = data;
            callback(Status, Msg, MsgRus);
        })
        .catch((error) => {
            const {status, body} = error;
            const parsedBody = body;
            console.error(error);
            return {status, parsedBody};
        })
}
