<script setup="ts">
import { useAuth } from "~/composables/useAuth";
const { user, authenticated } = useAuth();

const settingsData = ref({
  startYear: 0,
  lateIncome: false,
  lateIncomeDay: 0,
});

const saveSettings = async () => {
  console.log("Saving settings", settingsData.value);

  try {
    const res = await globalThis.$fetch("/api/configuration", {
      method: "POST",
      body: {
        userId: user.value.id,
        startYear: settingsData.value.startYear,
        lateIncome: settingsData.value.lateIncome,
        lateIncomeDay: settingsData.value.lateIncomeDay,
      },
    });

    console.log("Configuration saved");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div v-if="authenticated">
    <p>Bienvue sur la page configuration!</p>

    <p>
      Vous devez renseigner l'année de depart (startYear - int), les revenues
      tardif (lateIncome - bool), et le jour du revenue tardif si le choix
      d'avant est vrai (lateIncomeDay - int)
    </p>

    <div>Pour l'instant les valeurs sont {{ settingsData }}</div>

    <form @submit.prevent="saveSettings">
      <input
        type="number"
        v-model="settingsData.startYear"
        placeholder="startYear"
      />
      <input
        type="checkbox"
        v-model="settingsData.lateIncome"
        placeholder="lateIncome"
      />
      <input
        type="number"
        v-model="settingsData.lateIncomeDay"
        placeholder="lateIncomeDay"
      />
      <Button type="submit">submit</Button>
    </form>
  </div>
  <div v-else>
    <p>Vous n'êtes pas connecté</p>
    <a href="/authentification">Connexion</a>
  </div>
</template>
