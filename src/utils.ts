import { DEFAULT_INTEREST_RATE, DEFAULT_INVESTMENT } from "./constants";
import { IWorkSheetRow } from "./types/WorkSheetRow";

export const currencyFormatter = (amount: number) => {
  return new Intl.NumberFormat("en-IN").format(Math.round(amount));
};

export const calculateInterest = (amount: number, percent: number) => {
  return (percent * amount) / 100;
};

export const generateBaseWorksheet = (startYear: number) => {
  const yearlyReturns: IWorkSheetRow[] = [];

  let startBalance = 0;
  for (let i = 0; i < 15; i++) {
    const endBalance = startBalance + DEFAULT_INVESTMENT;
    const earnedInterest = calculateInterest(endBalance, DEFAULT_INTEREST_RATE);

    const currentYearReturn: IWorkSheetRow = {
      year: startYear + i,
      startBalance,
      investment: DEFAULT_INVESTMENT,
      endBalance,
      interestRate: DEFAULT_INTEREST_RATE,
      earnedInterest,
      endBalanceWithInterest: earnedInterest + endBalance,
    };

    yearlyReturns.push(currentYearReturn);
    startBalance = earnedInterest + endBalance;
  }

  return yearlyReturns;
};

export const correctWorksheet = (currWorksheet: IWorkSheetRow[]) => {
  const updatedWorksheet: IWorkSheetRow[] = [];

  let startBalance = currWorksheet[0].startBalance || 0;
  for (let i = 0; i < currWorksheet.length; i++) {
    const currRow = currWorksheet[i];
    const endBalance = startBalance + currRow.investment;
    const earnedInterest = calculateInterest(endBalance, currRow.interestRate);
    const endBalanceWithInterest = earnedInterest + endBalance;

    const currentYearReturn: IWorkSheetRow = {
      ...currRow,
      startBalance,
      endBalance,
      earnedInterest,
      endBalanceWithInterest,
    };

    updatedWorksheet.push(currentYearReturn);
    startBalance = endBalanceWithInterest;
  }

  return updatedWorksheet;
};
