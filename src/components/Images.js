import React from 'react';
import { useApi } from '../hooks/useApi';

export function Images() {
  const { loading, error, data } = useApi();

  if(loading) return <h1>Loading...</h1>;
  if(error) return <h1>Ups! Algo salío mal</h1>;
  return (
    <div className="images-container">
      {data.length > 0 && data.map(({ thumbnailUrl, id, title }) => (
        <img
          src={thumbnailUrl}
          alt={title}
          key={id}
        />
      ))}
    </div>
  )
}
