import { Asset } from "./asset";
import { Expense } from "./expense";

export interface MonthlyBudget {
    Income: number;
    Month: number;
    Year: number;
    JobField: string;
    Frequency: string;
    Expenses: Expense[];
    Assets: Asset[];
}