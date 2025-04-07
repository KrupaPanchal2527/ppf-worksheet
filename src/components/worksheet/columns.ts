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
    valueGetter: (params) => {
      const currentRowIndex = params?.node?.rowIndex;

      if (currentRowIndex === 0 || !currentRowIndex)
        return params?.data?.startBalance;

      const previousRow = params.api.getRowNode(`${currentRowIndex - 1}`);
      return previousRow?.data?.endBalanceWithInterest;
    },
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
    valueSetter: (params) => {
      // recalculate values dependant on investment value

      params.data.investment = params.newValue;
      params.data.endBalance = params.data.startBalance + params.newValue;
      params.data.earnedInterest = calculateInterest(
        params.data.endBalance || 0,
        params.data.interestRate
      );
      params.data.endBalanceWithInterest =
        calculateInterest(
          params.data.endBalance || 0,
          params.data.interestRate
        ) + (params.data.endBalance || 0);

      return true;
    },
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
    cellStyle: (params) => {
      console.log(params)
      return null;
    },
    valueFormatter: (params) => {
      if (params.node?.rowPinned === "bottom") return "";
      return `${params.value}%`;
    },
    valueSetter: (params) => {
      // recalculate values dependant on interestRate
      params.data.interestRate = params.newValue;
      params.data.earnedInterest = calculateInterest(
        params.data.endBalance || 0,
        params.data.interestRate
      );
      params.data.endBalanceWithInterest =
        calculateInterest(
          params.data.endBalance || 0,
          params.data.interestRate
        ) + (params.data.endBalance || 0);
      return true;
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
