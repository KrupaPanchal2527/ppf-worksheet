import { IWorkSheetRow } from "@/types/WorkSheetRow";
import { currencyFormatter } from "@/utils";
import { ColDef } from "ag-grid-community";

export const columnDefs: ColDef<IWorkSheetRow>[] = [
  {
    headerName: "Year",
    field: "year",
    pinned: "left",
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "Total";

      return `${params.value}-${params.value + 1}`;
    },
  },
  {
    headerName: "Start Balance",
    field: "startBalance",
    type: "rightAligned",
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "";
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: "Investment",
    field: "investment",
    type: "rightAligned",
    editable: true,
    valueFormatter: (params) => currencyFormatter(params.value),
  },
  {
    headerName: "End Balance",
    field: "endBalance",
    type: "rightAligned",
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "";
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: "Interest Rate",
    field: "interestRate",
    type: "rightAligned",
    editable: true,
    enableCellChangeFlash: true,
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "";
      return `${params.value}%`;
    },
  },
  {
    headerName: "Earned Interest",
    field: "earnedInterest",
    type: "rightAligned",
    valueFormatter: (params) => currencyFormatter(params.value),
  },
  {
    headerName: "End Balance (with interest)",
    field: "endBalanceWithInterest",
    type: "rightAligned",
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "";
      return currencyFormatter(params.value);
    },
  },
];
