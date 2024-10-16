<script setup="ts">
import { useAuth } from "~/composables/useAuth";
const { user, authenticated } = useAuth();
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const router = useRouter();

const settingsData = ref({
  startYear: new Date().getFullYear(),
  lateIncome: false,
  lateIncomeDay: null,
});

const error = ref(null);

const checkLateIncomeDate = () => {
  return !(
    settingsData.value.lateIncomeDay < 1 ||
    settingsData.value.lateIncomeDay > 31
  );
};

const saveSettings = async () => {
  console.log("Saving settings", settingsData.value);
  error.value = null;

  if (settingsData.value.lateIncome && !checkLateIncomeDate()) {
    error.value = "Le jour du revenu tardif doit être compris entre 1 et 31";
    console.error(error.value);
    return;
  }

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
  } catch (err) {
    console.error(err);
    error.value = "Une erreur est survenue lors de la sauvegarde.";
  }
};

watch(
  () => settingsData.value.lateIncomeDay,
  (newVal) => {
    if (settingsData.value.lateIncome && (newVal < 1 || newVal > 31)) {
      error.value = "Le jour du revenu tardif doit être compris entre 1 et 31";
    } else {
      error.value = null;
    }
  },
);
</script>

<template>
  <div class="container mx-auto p-6">
    <Card no-border v-if="authenticated" class="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Bienvenue sur la page de configuration. Veuillez renseigner les
          informations suivantes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p class="mb-4 text-sm text-muted-foreground">
          Vous devez renseigner l'année de départ pour votre dashboard, si vous
          souhaitez activer les revenus tardifs, et le jour du revenu tardif si
          le choix précédent est coché.
        </p>

        <form @submit.prevent="saveSettings" class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Label for="startYear">Année de départ </Label>
              <HoverCard>
                <HoverCardTrigger>
                  <!-- Votre icône SVG ici -->
                  <svg
                    fill="#000000"
                    id="Capa_1"
                    width="15px"
                    height="15px"
                    viewBox="0 0 416.979 416.979"
                    xml:space="preserve"
                    style="vertical-align: middle"
                  >
                    <g>
                      <path
                        d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
            c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
            c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
            c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
            c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
                      />
                    </g>
                  </svg>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p>Pour commencer, définissez l'année de départ (aaaa)</p>
                </HoverCardContent>
              </HoverCard>
            </div>
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
            <HoverCard>
              <HoverCardTrigger>
                <svg
                  fill="#000000"
                  id="Capa_1"
                  width="15px"
                  height="15px"
                  viewBox="0 0 416.979 416.979"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
          c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
          c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
          c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
          c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
                    />
                  </g>
                </svg>
              </HoverCardTrigger>
              <HoverCardContent>
                <p>
                  Activez cette option pour traiter les revenus tardifs reçus à
                  partir d'un certain jour du mois comme des revenus pour le
                  mois suivant.
                </p>
                <br />
                <p>
                  Cette option est particulièrement recommandée si vous recevez
                  votre salaire mensuel vers la fin du mois et que vous préférez
                  considérer ce revenu comme le revenu disponible pour le mois
                  suivant.
                </p>
              </HoverCardContent>
            </HoverCard>
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
          <div v-if="error" class="text-red-500 text-center mt-4">
            {{ error }}
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

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
