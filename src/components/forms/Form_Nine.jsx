import React from "react";

import "./index.css";

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  Column,
  Table,
  RowData,
} from "@samuelarbibe/react-table-rtl";

import { Button, Divider, Dropdown, Space, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { DndProvider, useDrag, useDrop } from "react-dnd";

const { useToken } = theme;

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];





const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

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
  );
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  // React.useEffect(() => {
  //   setValue(initialValue)
  // }, [initialValue])

  return [shouldSkip, skip];
}

function Form_Nine() {
  const defaultColumn = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue)
  
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
      }
  
      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
  
      return (
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={onBlur}
        />
      )
    },
  }
  const columns = React.useMemo(() => [
    {
      accessorKey: "firstName",
      id: "firstName",
      header: "First Name",
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (row) => row.lastName,
      id: "lastName",
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "age",
      id: "age",
      header: "Age",
      footer: (props) => props.column.id,
    },
  
    {
      accessorKey: "visits",
      id: "visits",
      header: "Visits",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Status",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "progress",
      id: "progress",
      header: "Profile Progress",
      footer: (props) => props.column.id,
    },
  ]);
  const [data, setData] = React.useState(() => [...defaultData]);
  // const [columns] = React.useState(() => [...column]);

  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");

  const [columnOrder, setColumnOrder] = React.useState([
    columns.map((column) => column.id),
  ]);
  const [columnPinning, setColumnPinning] = React.useState({});
  const [isSplit, setIsSplit] = React.useState(false);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    rtl: true,
    columnResizeMode,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    // defaultColumn,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,

    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,

    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // const randomizeColumns = () => {
  //   table.setColumnOrder(
  //     data.helpers.shuffle(table.getAllLeafColumns().map(d => d.id))
  //   )
  // }
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };
  const items = [];

  return (
    <div className="p-2">
      <div className="h-4" />
      <Dropdown
        menu={{
          items,
        }}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {React.cloneElement(menu, {
              style: menuStyle,
            })}
            <Divider
              style={{
                margin: 0,
              }}
            />
            <Space
              style={{
                padding: 8,
              }}
            >
              <div className="inline-block shadow rounded space-y-1">
                <div className="px-1 border-b border-black">
                  <label className="cursor-pointer">
                    <input
                      {...{
                        type: "checkbox",
                        checked: table.getIsAllColumnsVisible(),
                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                      }}
                    />{" "}
                    Toggle All
                  </label>
                </div>

                {table.getAllLeafColumns().map((column) => {
                  return (
                    <div key={column.id} className="px-1">
                      <label className="cursor-pointer">
                        <input
                          {...{
                            type: "checkbox",
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />{" "}
                        {column.id}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Space>
          </div>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>

      <div className="overflow-x-auto mt-5">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {/* {headerGroup.headers.map(header => (
                <DraggableColumnHeader
                  key={header.id}
                  header={header}
                  table={table}
                />
              ))} */}
                {headerGroup.headers.map((header) => (
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
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                        style: {
                          transform:
                            columnResizeMode === "onEnd" &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : "",
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
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
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

export default Form_Nine;
