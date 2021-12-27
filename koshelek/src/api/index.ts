import {TAnyKeyVal} from "@/types";

type TRequestArg = {
    method: 'GET' | 'POST' | 'PUT',
    headers?: TAnyKeyVal,
    path: string,
}

export class BaseApi {
    host: string;

    constructor(host = 'https://restcountries.com/v3.1/') {
        this.host = host;
    }

    private isOk = async (response: Response): Promise<void | string> => {
        const {ok, status} = response;
        if (!ok) {
            throw new Error(`HTTP Error [${status}], url: ${response.url}`);
        }

        return await response.text();
    }

    private request = ({method, path, headers}: TRequestArg): Promise<void | string> => {
        return fetch(`${this.host}/${path}`, {
            method,
            headers,
        }).then(this.isOk)
            .catch(e => console.error(e));
    }

    private queryBuilder = (queryParamsList: TAnyKeyVal): string => {
        return '?' + Object.keys(queryParamsList)
            .map(k => `${encodeURIComponent(k)}=${queryParamsList[k]}`)
            .join('&');
    }

    public getRequest = async (path: string, queryList?: TAnyKeyVal, headers?: TAnyKeyVal): Promise<string> => {
        let queryString = '';

        if (queryList) {
            queryString = this.queryBuilder(queryList);
        }

        const response = await this.request({
            method: "GET",
            path: path + queryString,
            headers,
        });

        if (!response) {
            return '';
        }

        return response;
    }
}