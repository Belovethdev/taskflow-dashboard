import React from 'react';

const Table = ({ 
  headers, 
  data, 
  renderRow,
  className = '' 
}) => {
  return (
    <table className={`table ${className}`}>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  );
};

export default Table;