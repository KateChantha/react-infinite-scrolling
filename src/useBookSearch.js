import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * @desc create a custom hook
 * useEffect -> side effect of calling API everytime that some parameter's changed
 * store state that later will be return/expose outside this custom hook
 */
export default function useBookSearch(query, pageNumber) {

  // initailize loading to true, because it is the first thing we do is load in side out app
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // reset book state back to [] every time when make a new query
  useEffect(() => {
    setBooks([])
  }, [query])


  // call API everytime that query or pageNumber has changed
  // this API comes with builtin page
  useEffect(() => {
    // ==== set state when a request is made ===
    setLoading(true);
    setError(false);

    // store and return cancel method to prevent from ongoing fecthing data, so it will be only one request is made - not every type stroke
    let cancel;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {

      // add more books result to provious state
      // use new Set to return just unique title - no duplication and use spread operator to convert it back to an array
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])];
      })

      // check if there is no more books to be load, if greater than 0 means we have no more data, so we knows that we don't need to make this query again
      setHasMore(res.data.docs.length > 0)
      // at the end of fething data, reset loading
      setLoading(false);

      console.log('response:', res.data);
    }).catch(e => {
      // use builtin axios method to ignore error id is happen from cancel method
      if (axios.isCancel(e)) return;
      setError(true);
    })
    return () => cancel()
  }, [query, pageNumber])

  // =====================================
  //  return state from this custom hooks
  // =====================================
  return { loading, error, books, hasMore }
}
