import { updateConfiguration } from "~/server/utils/configuration";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, startYear, lateIncome, lateIncomeDay } = body;

  try {
    await updateConfiguration({ userId, startYear, lateIncome, lateIncomeDay });
  } catch (error) {
    console.error("Error in updateConfiguration:", error);
    return new Response("Error", { status: 500 });
  }
});
