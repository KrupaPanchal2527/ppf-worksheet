export interface IWorkSheetRow {
    year: number;
    startBalance: number;
    investment: number;
    endBalance?: number;
    interestRate: number;
    earnedInterest?: number;
    endBalanceWithInterest?: number;
}