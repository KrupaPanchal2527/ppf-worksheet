"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import { columnDefs } from "./columns";
import { generateBaseWorksheet } from "@/utils";
import { IWorkSheetRow } from "@/types/WorkSheetRow";
import {
  RowClassParams,
  RowDataUpdatedEvent,
  RowStyle,
  themeQuartz,
} from "ag-grid-community";

const myTheme = themeQuartz.withParams({
  columnBorder: { style: "solid" },
  headerColumnBorder: { style: "solid" },
});

export default function Worksheet() {
  const [worksheetData] = React.useState(() =>
    generateBaseWorksheet(new Date().getFullYear())
  );

  const onRowDataUpdated = (event: RowDataUpdatedEvent<IWorkSheetRow>) => {
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
        defaultColDef={{ sortable: false, resizable: false }}
        gridOptions={{
          domLayout: "autoHeight",
          pinnedBottomRowData: [{ earnedInterest: 0, investment: 0 }],
        }}
        rowData={worksheetData}
        columnDefs={columnDefs}
        onRowDataUpdated={onRowDataUpdated}
        getRowStyle={getRowStyle}
        theme={myTheme}
      />
    </div>
  );
}
