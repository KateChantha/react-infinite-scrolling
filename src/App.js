import React, { useState } from 'react';
// import './App.css';
import useBookSearch from './useBookSearch';

export default function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  useBookSearch(query, pageNumber)
  const handleSearch = (e) => {
    setQuery(e.target.value);
    // everytime new query, set to start search at page 1 
    setPageNumber(1);
  }

  return (
    < >
      <input type='text' onChange={handleSearch}></input>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  )
}
