
import {API_KEY, PAGE_SIZE, SEARCH_URL} from '../settings';

export default function search(config) {
    const xhr = fetch(`${SEARCH_URL}${config.query}&api_key=${API_KEY}&offset=${config.currentPage}&limit=${PAGE_SIZE}`);

       xhr.then((response) => response.json())
      .then((json) => {
          const {...data} = json
          return config.callback(data)
          })


}


/*
import * as $ from 'jquery';


export function search1(config) {
    const xhr = $.get(`${SEARCH_URL}${config.query}&api_key=${API_KEY}&offset=${config.currentPage}&limit=${PAGE_SIZE}`);

    xhr.then((response) => {
        config.callback(response);
    });
}
*/


/*
export function search11(config) {
    const xhr = fetch(`${SEARCH_URL}${config.query}&api_key=${API_KEY}&offset=${config.currentPage}&limit=${PAGE_SIZE}`);

       xhr.then((response) => config.callback(response.json()))
      .then((json) => {
        const {data, pagination} = json;
        return { data, pagination };
      });

}
*/