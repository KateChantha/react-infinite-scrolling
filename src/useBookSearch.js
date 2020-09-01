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
    // store and return cancel method to prevent from ongoing fecthing data, so it will be only one request is made - not every type stroke
    let cancel;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log('response:', res.data);
    }).catch(e => {
      // use builtin axios method to ignore error id is happen from cancel method
      if (axios.isCancel(e)) return
    })
    return () => cancel()
  }, [query, pageNumber])

  return null
}
