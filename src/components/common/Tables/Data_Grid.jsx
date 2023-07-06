"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


const colors = ['Red', 'Green', 'Blue'];
const Data_Grid = (props) => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "1000", height: 600 }), []);
  const [rowData, setRowData] = useState();

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      sortable: true,
      editable: true,
      enableRowGroup: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));

      setRowData(props.fakeData)
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.paginationGoToPage(4);
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  return (
    <div style={containerStyle}>
      {/* <div className="example-header">
        Page Size:
        <select onChange={onPageSizeChanged} id="page-size">
          <option value="10">10</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div> */}
      <div style={props.gridStyle} className="ag-theme-alpine">
        <AgGridReact
          sideBar={true}
          enableRtl={true}
          pagination={true}
          groupSelectsChildren={true}
          rowSelection={"multiple"}
          rowGroupPanelShow="always"
          rowData={rowData}
          columnDefs={props.columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          //   onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default Data_Grid;
