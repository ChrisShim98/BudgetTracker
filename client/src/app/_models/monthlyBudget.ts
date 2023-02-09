import { Asset } from "./asset";
import { Expense } from "./expense";

export interface MonthlyBudget {
    id: number;
    Income: number;
    Month: number;
    Year: number;
    JobField: string;
    Frequency: string;
    ExpenseTotal: number;
    Expenses: Expense[];
    AssetTotal: number;
    Assets: Asset[];
}