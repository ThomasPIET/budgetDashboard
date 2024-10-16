<script setup="ts">
import { useAuth } from "~/composables/useAuth";
const { user, authenticated } = useAuth();
import { ref } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";

const settingsData = ref({
  startYear: new Date().getFullYear(),
  lateIncome: false,
  lateIncomeDay: 0,
});

const router = useRouter();

const saveSettings = async () => {
  console.log("Saving settings", settingsData.value);

  try {
    await globalThis.$fetch("/api/configuration", {
      method: "POST",
      body: {
        userId: user.value.id,
        startYear: settingsData.value.startYear,
        lateIncome: settingsData.value.lateIncome,
        lateIncomeDay: settingsData.value.lateIncomeDay,
      },
    });

    console.log("Configuration saved");
    await router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container mx-auto p-6">
    <Card v-if="authenticated" class="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Bienvenue sur la page de configuration. Veuillez renseigner les
          informations suivantes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="mb-4 text-sm text-muted-foreground">
          Vous devez renseigner l'année de départ (startYear - int), les revenus
          tardifs (lateIncome - bool), et le jour du revenu tardif si le choix
          précédent est vrai (lateIncomeDay - int).
        </p>

        <form @submit.prevent="saveSettings" class="space-y-4">
          <div class="space-y-2">
            <Label for="startYear">Année de départ</Label>
            <Input
              id="startYear"
              type="number"
              v-model="settingsData.startYear"
              placeholder="Entrez l'année de départ"
            />
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox id="lateIncome" v-model="settingsData.lateIncome" />
            <Label for="lateIncome">Revenus tardifs</Label>
          </div>
          <div v-if="settingsData.lateIncome" class="space-y-2">
            <Label for="lateIncomeDay">Jour du revenu tardif</Label>
            <Input
              id="lateIncomeDay"
              type="number"
              v-model="settingsData.lateIncomeDay"
              placeholder="Entrez le jour du revenu tardif"
            />
          </div>
          <Button type="submit" class="w-full">Enregistrer</Button>
        </form>
      </CardContent>
    </Card>
    <Card v-else class="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Accès Restreint</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-4">Vous n'êtes pas connecté.</p>
        <Button asChild type="submit" class="w-full">
          <a href="/authentification">Connexion</a>
        </Button>
      </CardContent>
    </Card>

    <div class="mt-6 p-4 bg-muted rounded-lg">
      <p class="font-medium">Valeurs actuelles :</p>
      <pre class="mt-2 text-sm">{{
        JSON.stringify(settingsData, null, 2)
      }}</pre>
    </div>
  </div>
</template>
