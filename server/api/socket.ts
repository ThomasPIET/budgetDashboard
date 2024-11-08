import { Server } from "socket.io";
import type { PrismaClient } from "@prisma/client";
import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const server = event.node.res.socket?.server;
  if (!server) throw new Error("No server found fckkkk");

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Gestion des données de revenus, dépenses, et budgets
    socket.on("saveData", async (data) => {
      console.log("Data received:", data);

      try {
        const prisma: PrismaClient = event.context.prisma;

        // Exemple de sauvegarde des revenus
        for (const income of data.incomes) {
          await prisma.income.upsert({
            where: { id: income.id || 0 }, // On utilise `id` pour upsert si disponible
            update: {
              name: income.name,
              amount: income.amount,
              month: income.month,
              year: income.year,
              userId: income.userId,
            },
            create: {
              name: income.name,
              amount: income.amount,
              month: income.month,
              year: income.year,
              userId: income.userId,
            },
          });
        }

        for (const expense of data.expenses) {
          await prisma.expense.upsert({
            where: { id: expense.id || 0 },
            update: {
              description: expense.description,
              amount: expense.amount,
              date: new Date(expense.date),
              categoryId: expense.categoryId,
              userId: expense.userId,
            },
            create: {
              description: expense.description,
              amount: expense.amount,
              date: new Date(expense.date),
              categoryId: expense.categoryId,
              userId: expense.userId,
            },
          });
        }

        // Exemple de sauvegarde du budget
        if (data.budget) {
          const budget = data.budget;
          await prisma.budget.upsert({
            where: { id: budget.id || 0 },
            update: {
              month: budget.month,
              year: budget.year,
              totalIncome: budget.totalIncome,
              totalExpenses: budget.totalExpenses,
              totalSavings: budget.totalSavings,
              userId: budget.userId,
            },
            create: {
              month: budget.month,
              year: budget.year,
              totalIncome: budget.totalIncome,
              totalExpenses: budget.totalExpenses,
              totalSavings: budget.totalSavings,
              userId: budget.userId,
            },
          });
        }

        console.log("Data saved successfully");
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
});
