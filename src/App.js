import React, { useState } from 'react';
// import './App.css';
import useBookSearch from './useBookSearch';

export default function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  // ===========================
  // destructuring state that return from useBookSearch
  // ===========================
  const { books, error, loading, hasMore } = useBookSearch(query, pageNumber)


  const handleSearch = (e) => {
    setQuery(e.target.value);
    // everytime new query, set to start search at page 1 
    setPageNumber(1);
  }

  return (
    < >
      <input type='text' onChange={handleSearch}></input>
      {books.map(book => {
        return <div key={book}>{book}</div>
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}
