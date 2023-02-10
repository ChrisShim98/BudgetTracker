using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Data.Migrations
{
    /// <inheritdoc />
    public partial class MappingDTOs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_MonthlyBudget_BudgetId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_MonthlyBudget_BudgetId",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "BudgetId",
                table: "Expenses",
                newName: "BudgetParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_BudgetId",
                table: "Expenses",
                newName: "IX_Expenses_BudgetParentId");

            migrationBuilder.RenameColumn(
                name: "BudgetId",
                table: "Assets",
                newName: "BudgetParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Assets_BudgetId",
                table: "Assets",
                newName: "IX_Assets_BudgetParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_MonthlyBudget_BudgetParentId",
                table: "Assets",
                column: "BudgetParentId",
                principalTable: "MonthlyBudget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_MonthlyBudget_BudgetParentId",
                table: "Expenses",
                column: "BudgetParentId",
                principalTable: "MonthlyBudget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_MonthlyBudget_BudgetParentId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_MonthlyBudget_BudgetParentId",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "BudgetParentId",
                table: "Expenses",
                newName: "BudgetId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_BudgetParentId",
                table: "Expenses",
                newName: "IX_Expenses_BudgetId");

            migrationBuilder.RenameColumn(
                name: "BudgetParentId",
                table: "Assets",
                newName: "BudgetId");

            migrationBuilder.RenameIndex(
                name: "IX_Assets_BudgetParentId",
                table: "Assets",
                newName: "IX_Assets_BudgetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_MonthlyBudget_BudgetId",
                table: "Assets",
                column: "BudgetId",
                principalTable: "MonthlyBudget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_MonthlyBudget_BudgetId",
                table: "Expenses",
                column: "BudgetId",
                principalTable: "MonthlyBudget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
