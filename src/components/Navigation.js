import React, { useContext } from 'react';
import { Context } from '../store';

export function Navigation() {
  const { page, handlePrevPage, handleNextPage } = useContext(Context)

  return (
    <div className="navigation">
      <button
        onClick={handlePrevPage}
        disabled={page <= 1}
      >
        prev
      </button>
      <span>{page}</span>
      <button
        onClick={handleNextPage}
        disabled={page >= 10}
      >
        next
      </button>
    </div>
  )
}
