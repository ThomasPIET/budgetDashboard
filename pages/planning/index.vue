<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const { user, authenticated } = useAuth();

const annee = ref(new Date().getFullYear());
const mois = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const revenus = ref([]);
const depenses = ref([]);
const economies = ref([]);

const ajouterLigne = (categorie) => {
  const nouvelleLigne = {
    nom: "",
    janvier: 0,
    février: 0,
    mars: 0,
    avril: 0,
    mai: 0,
    juin: 0,
    juillet: 0,
    août: 0,
    septembre: 0,
    octobre: 0,
    novembre: 0,
    décembre: 0,
  };

  if (categorie === "revenus") revenus.value.push(nouvelleLigne);
  else if (categorie === "depenses") depenses.value.push(nouvelleLigne);
  else if (categorie === "economies") economies.value.push(nouvelleLigne);
};
</script>

<template>
  <div v-if="authenticated" class="border border-gray-200 rounded-lg p-2 m-10">
    <h2 class="text-2xl font-semibold mb-4 pl-3">Planning {{ annee }}</h2>
    <div class="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px] font-bold">Revenus</TableHead>
            <TableHead v-for="mois in mois" :key="mois">{{ mois }}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="(revenu, index) in revenus" :key="`revenu-${index}`">
            <TableCell>
              <Input
                v-model="revenu.nom"
                placeholder="Nom du revenu"
                class="w-full bg-transparent"
              />
            </TableCell>
            <TableCell v-for="mois in mois" :key="`revenu-${index}-${mois}`">
              <Input
                v-model="revenu[mois.toLowerCase()]"
                type="number"
                class="w-full bg-transparent"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                @click="ajouterLigne('revenus')"
                >Ajouter un revenu</Button
              >
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell class="font-bold">Total</TableCell>
            <TableCell v-for="mois in mois" :key="mois">
              {{
                revenus.reduce(
                  (total, revenu) => total + Number(revenu[mois.toLowerCase()]),
                  0,
                )
              }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px] font-bold">Dépenses</TableHead>
            <TableHead v-for="mois in mois" :key="mois">{{ mois }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(depense, index) in depenses"
            :key="`depense-${index}`"
          >
            <TableCell>
              <Input
                v-model="depense.nom"
                placeholder="Nom de la dépense"
                class="w-full bg-transparent"
              />
            </TableCell>
            <TableCell v-for="mois in mois" :key="`depense-${index}-${mois}`">
              <Input
                v-model="depense[mois.toLowerCase()]"
                type="number"
                class="w-full bg-transparent"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                @click="ajouterLigne('depenses')"
                >Ajouter une dépense</Button
              >
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell class="font-bold">Total</TableCell>
            <TableCell v-for="mois in mois" :key="mois">
              <!--      Total expense-->
              {{
                depenses.reduce(
                  (total, depense) =>
                    total + Number(depense[mois.toLowerCase()]),
                  0,
                )
              }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px] font-bold">Dépenses</TableHead>
            <TableHead v-for="mois in mois" :key="mois">{{ mois }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(economie, index) in economies"
            :key="`economie-${index}`"
          >
            <TableCell>
              <Input
                v-model="economie.nom"
                placeholder="Nom de l'économie"
                class="w-full bg-transparent"
              />
            </TableCell>
            <TableCell v-for="mois in mois" :key="`economie-${index}-${mois}`">
              <Input
                v-model="economie[mois.toLowerCase()]"
                type="number"
                class="w-full bg-transparent"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                @click="ajouterLigne('economies')"
                >Ajouter une économie</Button
              >
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell class="font-bold">Total</TableCell>
            <TableCell v-for="mois in mois" :key="mois">
              <!--      Total Saving-->
              {{
                economies.reduce(
                  (total, economie) =>
                    total + Number(economie[mois.toLowerCase()]),
                  0,
                )
              }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  </div>
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
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
