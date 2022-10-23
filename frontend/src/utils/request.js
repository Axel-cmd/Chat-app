function request({url, method, body, customHeaders = {}}) {

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...customHeaders
    });
    
    const init = {
        method,
        headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    }

    return fetch("http://localhost:8080"+url, init);
}

export function authRequest({url, method, body, customHeaders={}}) {

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');


    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
        ...customHeaders
    })

    const init = {
        method,
        headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    }

    return fetch("http://localhost:8080"+url, init);
}


export default request;