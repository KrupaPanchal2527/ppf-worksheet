"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import { columnDefs } from "./columns";
import { generateBaseWorksheet } from "@/utils";
import { IWorkSheetRow } from "@/types/WorkSheetRow";
import {
  CellValueChangedEvent,
  RowClassParams,
  RowDataUpdatedEvent,
  RowStyle,
  themeQuartz,
} from "ag-grid-community";

const theme = themeQuartz.withParams({
  columnBorder: { style: "solid" },
  headerColumnBorder: { style: "solid" },
});

export default function Worksheet() {
  const [worksheetData] = React.useState(() =>
    generateBaseWorksheet(new Date().getFullYear())
  );
  const ref = React.useRef<AgGridReact>(null);

  const onRowDataUpdated = (
    event: RowDataUpdatedEvent<IWorkSheetRow> | CellValueChangedEvent
  ) => {
    // Calculate pinned row data
    const footerRow = {
      earnedInterest: 0,
      investment: 0,
    };

    event.api.forEachNode((node) => {
      footerRow.earnedInterest += node.data?.earnedInterest || 0;
      footerRow.investment += node.data?.investment || 0;
    });

    event.api?.setGridOption("pinnedBottomRowData", [footerRow]);
  };

  const getRowStyle = React.useCallback(
    (params: RowClassParams): RowStyle | undefined => {
      if (params.node.rowPinned) {
        return { fontWeight: "bold", backgroundColor: "#f4f6fb" };
      }
    },
    []
  );

  return (
    <div>
      <AgGridReact
        ref={ref}
        defaultColDef={{ sortable: false, resizable: true }}
        gridOptions={{
          domLayout: "autoHeight",
          pinnedBottomRowData: [{ earnedInterest: 0, investment: 0 }],
        }}
        rowData={worksheetData}
        columnDefs={columnDefs}
        onRowDataUpdated={onRowDataUpdated}
        getRowStyle={getRowStyle}
        theme={theme}
        onGridReady={(event) => event.api.sizeColumnsToFit()}
        onCellValueChanged={(params) => {
          params.api.refreshCells();
          onRowDataUpdated(params);
        }}
      />
    </div>
  );
}
