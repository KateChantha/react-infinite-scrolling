import React, { useState, useRef, useCallback } from 'react';
// import './App.css';
import useBookSearch from './useBookSearch';


export default function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  // ===========================
  // destructuring state that return from useBookSearch
  // ===========================
  const { books, error, loading, hasMore } = useBookSearch(query, pageNumber)

  // by default, obserever start to null
  const observer = useRef();

  // this callback will return a list of dependencies
  const lastBookElementRef = useCallback(node => {
    // if still loading data, do not tricker infinit scrolling
    if (loading) return;
    // disconnect the previous elements, so the new last element will be hooked up correctly -- using all builin API
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {

      // if entries[0] which is the last elem is intersecting/ scrolling to bottom of page, and if still moew book to be loaded
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    // if we have the last node
    if (node) observer.current.observe(node);

  }, [loading, hasMore]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // everytime new query, set to start search at page 1 
    setPageNumber(1);
  }

  return (
    < >
      <input type='text' value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={book}>{book}</div>
        } else {
          return <div key={book}>{book}</div>
        }

      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}
