import React from 'react'

import './index.css'

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@samuelarbibe/react-table-rtl'

import { DndProvider, useDrag, useDrop } from 'react-dnd'


const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const defaultColumns= [
    {
        accessorKey: 'firstName',
        id: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        footer: props => props.column.id,
      },
    
      {
        accessorKey: 'visits',
        id: 'visits',
        header: 'Visits',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'progress',
        id: 'progress',
        header: 'Profile Progress',
        footer: props => props.column.id,
      },
]

const reorderColumn = (
    draggedColumnId,
    targetColumnId,
    columnOrder,
  ) => {
    columnOrder.splice(
      columnOrder.indexOf(targetColumnId),
      0,
      columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    )
    return [...columnOrder]
  }


const DraggableColumnHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header
  
    const [, dropRef] = useDrop({
      accept: 'column',
      drop: (draggedColumn) => {
        const newColumnOrder = reorderColumn(
          draggedColumn.id,
          column.id,
          columnOrder
        )
        setColumnOrder(newColumnOrder)
      },
    })
  
    const [{ isDragging }, dragRef, previewRef] = useDrag({
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      item: () => column,
      type: 'column',
    })
  
    return (
      <th
        ref={dropRef}
        colSpan={header.colSpan}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div ref={previewRef}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          <button ref={dragRef}>🟰</button>
        </div>
      </th>
    )
  }


function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current
  
    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
      shouldSkipRef.current = false
    }, [])
  
    React.useEffect(() => {
      shouldSkipRef.current = true
    })
  
    return [shouldSkip, skip] 
  }
  

function Form_Nine() {
  const [data, setData] = React.useState(() => [...defaultData])
  const [columns] = React.useState(() => [
    ...defaultColumns,
  ])


  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const [columnResizeMode, setColumnResizeMode] =
    React.useState('onChange')

  const [columnOrder, setColumnOrder] = React.useState([columns.map(column => column.id)]  )
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    rtl: true,
    columnResizeMode,
    
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,

    // defaultColumn,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,


   
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,

  })

  return (
    <div className="p-2">
      <div className="h-4" />
      <div className="text-xl">{'<table/>'}</div>
      <div className="overflow-x-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
             {/* {headerGroup.headers.map(header => (
                <DraggableColumnHeader
                  key={header.id}
                  header={header}
                  table={table}
                />
              ))} */}
                {headerGroup.headers.map(header => (
                  <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        style: {
                          transform:
                            columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : '',
                        },
                      }}
                    />

                    {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" />

    </div>
  )
}



function Filter({
    column,
    table,
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    return typeof firstValue === 'number' ? (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue)?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          value={(columnFilterValue )?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
    ) : (
      <input
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="w-36 border shadow rounded"
      />
    )
  }





export default Form_Nine



