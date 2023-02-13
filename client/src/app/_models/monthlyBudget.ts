import { Asset } from "./asset";
import { Expense } from "./expense";

export interface MonthlyBudget {
    id: number;
    income: string;
    month: number;
    year: number;
    jobField: string;
    frequency: string;
    expenseTotal: number;
    expenses: Expense[];
    assetTotal: number;
    assets: Asset[];
    budgetParentId: number;
}