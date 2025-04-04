import { IWorkSheetRow } from "@/types/WorkSheetRow";
import { currencyFormatter, calculateInterest } from "@/utils";
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
      if (params.node?.isRowPinned()) return "";
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: "Investment",
    field: "investment",
    type: "rightAligned",
    valueFormatter: (params) => currencyFormatter(params.value),
  },
  {
    headerName: "End Balance",
    field: "endBalance",
    type: "rightAligned",
    valueGetter: (params) => {
      if (params.node?.isRowPinned()) return params?.data?.endBalance;
      return (params.data?.startBalance || 0) + (params?.data?.investment || 0);
    },
    valueFormatter: (params) => {
      if (params.node?.isRowPinned()) return "";
      return currencyFormatter(params.value);
    },
  },
  {
    headerName: "Interest Rate",
    field: "interestRate",
    type: "rightAligned",
    valueFormatter: (params) => {
      if (params.node?.isRowPinned()) return "";
      return `${params.value}%`;
    },
  },
  {
    headerName: "Earned Interest",
    field: "earnedInterest",
    type: "rightAligned",
    valueFormatter: (params) => currencyFormatter(params.value),
    valueGetter: (params) => {
      if (params.node?.isRowPinned()) return params.data?.earnedInterest;
      return calculateInterest(
        params.getValue("endBalance") || 0,
        params?.data?.interestRate || 0
      );
    },
  },
  {
    headerName: "End Balance (with interest)",
    field: "endBalanceWithInterest",
    type: "rightAligned",
    valueFormatter: (params) => {
      if (params.node?.isRowPinned()) return "";
      return currencyFormatter(params.value);
    },
    valueGetter: (params) => {
      if (params.node?.isRowPinned())
        return params.data?.endBalanceWithInterest;
      return (
        calculateInterest(
          params.getValue("endBalance") || 0,
          params?.data?.interestRate || 0
        ) + params.getValue("endBalance")
      );
    },
  },
];
