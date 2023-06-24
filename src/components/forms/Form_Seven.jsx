import React, { useState } from 'react';

const Form_Seven = () => {
  const [columns, setColumns] = useState([
    { name: 'Name', width: 200 },
    { name: 'Family', width: 200 },
    { name: 'Gender', width: 200 },
    { name: 'Currency', width: 200 },
    { name: 'Currency2', width: 200 },
    { name: 'Tax', width: 200 },
  ]);
  const data = [
    {name: "erfan"},
    {name: "reza"},
    {name: "ali"},
  ]

  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);
  const [draggedColumnOffset, setDraggedColumnOffset] = useState(null);

  const handleResize = (columnIndex, deltaWidth) => {
    const newColumns = [...columns];
    newColumns[columnIndex].width += deltaWidth;
    setColumns(newColumns);
  };

  const handleDragStart = (event, columnIndex) => {
    setDraggedColumnIndex(columnIndex);
    setDraggedColumnOffset(event.pageX - columns[columnIndex].width);
  };

  const handleDragEnd = () => {
    setDraggedColumnIndex(null);
    setDraggedColumnOffset(null);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              style={{ width: column.width }}
              onMouseDown={(event) => handleDragStart(event, index)}
              onMouseUp={handleDragEnd}
            >
              {column.name}
              {draggedColumnIndex === index && (
                <div
                  className="resize-handle"
                  style={{ left: columns[index].width + draggedColumnOffset }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                  onMouseMove={(event) =>
                    handleResize(index, event.pageX - columns[index].width - draggedColumnOffset)
                  }
                  onMouseUp={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Form_Seven;