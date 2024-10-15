export async function updateConfiguration({
  userId,
  startYear,
  lateIncome,
  lateIncomeDay,
}) {
  console.log("Updating configuration");
  console.log("User ID:", userId);
  console.log("Start year:", startYear);
  console.log("Late income:", lateIncome);
  console.log("Late income day:", lateIncomeDay);

  try {
    const user = await getUserById(userId);

    if (!user) {
      console.log("User not found");
      return null;
    }

    const configuration = await prisma.setting.upsert({
      where: {
        userId: userId,
      },
      update: {
        startYear: startYear,
        lateIncome: lateIncome,
        lateIncomeDay: lateIncomeDay,
      },
      create: {
        startYear: startYear,
        lateIncome: lateIncome,
        lateIncomeDay: lateIncomeDay,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log("Configuration updated");
    console.log("Configuration:", configuration);
    return configuration;
  } catch (error) {
    console.error("Error in updateConfiguration:", error);
    throw error;
  }
}
