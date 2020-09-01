import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * @desc create a custom hook
 * useEffect -> side effect of calling API everytime that some parameter's changed
 * store state that later will be return/expose outside this custom hook
 */
export default function useBookSearch(query, pageNumber) {

  // call API everytime that query or pageNumber has changed
  // this API comes with builtin page
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber }
    }).then(res => {
      console.log('response:', res.data);
    })
  }, [query, pageNumber])

  return null
}
