import { QueryParam, DataResponce } from './index.types';
import { BACKEND_URL, METHODS } from './config/index.constants';

/**
 * Performs ajax request
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {Map<string, string>} queryParams - query GET params for requesst
 * @param {object} body - body for POST request
 * @param {CallbackFunction} callback - callback function
 * @returns promise
 */
export async function ajax<T>(
    method: string,
    url: string,
    queryParams: Array<QueryParam>,
    body: object = null,
) {
    let fullUrl = BACKEND_URL + url;
    if (queryParams) {
        const newUrl = new URL(fullUrl);
        queryParams.forEach(({ key, value }) => {
            newUrl.searchParams.append(key, value);
        });
        fullUrl = newUrl.toString();
    }

    const headers = new Headers();
    if (body) {
        headers.set('Content-Type', 'application/json; charset=utf8');
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
        .then((data: DataResponce<T>) => {
            return data;
        })
        .catch((error: DataResponce<T>) => {
            return error;
        });
}

/**
 * Performs GET request
 * @param url - url for request
 * @param queryParams - query GET params for requesst
 * @returns promise
 */
export async function ajaxGet<T>(url: string, queryParams: Array<QueryParam>) {
    return ajax<T>(METHODS.GET, url, queryParams);
}

/**
 * Performs POST request
 * @param url - url for request
 * @param queryParams - query GET params for requesst
 * @param body - body for POST request
 * @returns promise
 */
export async function ajaxPost<T>(
    url: string,
    queryParams: Array<QueryParam>,
    body: object,
) {
    return ajax<T>(METHODS.POST, url, queryParams, body);
}

/**
 * Performs ajax request sending form data
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {HTMLFormElement} form - html form to send
 * @param {CallbackFunction} callback - callback function
 * @returns promise
 */
export async function ajaxMultipartForm<T>(
    method: string,
    url: string,
    formData: FormData,
) {
    return fetch(BACKEND_URL + url, {
        method,
        credentials: 'include',
        body: formData,
    })
        .then((response) => {
            return response.json();
        })
        .then((data: DataResponce<T>) => {
            return data;
        })
        .catch((error: DataResponce<T>) => {
            return error;
        });
}
