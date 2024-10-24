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

const allocationsParMois = computed(() => {
  const moisMinuscules = mois.map((m) => m.toLowerCase());
  const resultats = [];

  moisMinuscules.forEach((moisKey, index) => {
    const moisCible = mois[index];

    const totalRevenu = revenus.value.reduce(
      (total, revenu) => total + Number(revenu[moisKey] || 0),
      0,
    );

    const totalDepenses = depenses.value.reduce(
      (total, depense) => total + Number(depense[moisKey] || 0),
      0,
    );

    const totalEconomies = economies.value.reduce(
      (total, economie) => total + Number(economie[moisKey] || 0),
      0,
    );

    const allocationCorrecte = totalRevenu === totalDepenses + totalEconomies;

    resultats.push({
      mois: moisCible,
      revenu: totalRevenu,
      depenses: totalDepenses,
      economies: totalEconomies,
      allocationCorrecte: allocationCorrecte,
      toBeAllocated: totalRevenu - (totalDepenses + totalEconomies),
    });
  });

  return resultats;
});
</script>

<template>
  <div v-if="authenticated" class="">
    <div class="border-2 border-gray-200 rounded-lg p-2 m-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="text-2xl font-semibold text-center mb-4 pl-3">
              Planning {{ annee }}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell
              v-for="allocation in allocationsParMois"
              :key="allocation.mois"
              class="text-center"
            >
              {{ allocation.mois }}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableFooter>
          <TableRow>
            <div
              class="flex items-center h-12 px-4 text-left align-middle font-bold text-muted-foreground"
            >
              To be allocated
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M4 11.25a.75.75 0 0 0 0 1.5zm0 1.5h16v-1.5H4z"
                    opacity="0.5"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m14 6l6 6l-6 6"
                  />
                </g>
              </svg>
            </div>
            <TableCell
              v-for="allocation in allocationsParMois"
              :key="allocation.mois"
              :class="{
                'text-green-500': allocation.toBeAllocated === 0,
                'text-red-500': allocation.toBeAllocated !== 0,
              }"
              class="text-center"
            >
              {{ allocation.toBeAllocated }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>

    <div class="border-2 border-gray-200 rounded-lg p-2 m-10">
      <div class="overflow-x-auto rounded">
        <Table class="rounded bg-green-100">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[200px] font-bold">Revenus</TableHead>
              <TableHead class="text-center" v-for="mois in mois" :key="mois">{{
                mois
              }}</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="(revenu, index) in revenus"
              :key="`revenu-${index}`"
            >
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
                  class="w-full bg-transparent text-center"
                />
              </TableCell>
              <TableCell>
                {{
                  Object.keys(revenu)
                    .filter((key) =>
                      mois
                        .slice(0)
                        .map((m) => m.toLowerCase())
                        .includes(key),
                    )
                    .reduce((total, key) => total + Number(revenu[key]), 0)
                }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  @click="ajouterLigne('revenus')"
                  >Ajouter un revenu
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell class="font-bold">Total</TableCell>
              <TableCell v-for="mois in mois" :key="mois" class="text-center">
                {{
                  revenus.reduce(
                    (total, revenu) =>
                      total + Number(revenu[mois.toLowerCase()]),
                    0,
                  )
                }}
              </TableCell>
              <TableCell>
                {{
                  revenus.reduce(
                    (total, revenu) =>
                      total +
                      Object.keys(revenu)
                        .filter((key) =>
                          mois
                            .slice(0)
                            .map((m) => m.toLowerCase())
                            .includes(key),
                        )
                        .reduce((total, key) => total + Number(revenu[key]), 0),
                    0,
                  )
                }}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Table class="mt-5 bg-pink-200 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[200px] font-bold">Dépenses</TableHead>
              <TableHead v-for="mois in mois" :key="mois">{{ mois }}</TableHead>
              <TableHead>Total</TableHead>
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
              <TableCell>
                {{
                  Object.keys(depense)
                    .filter((key) =>
                      mois
                        .slice(0)
                        .map((m) => m.toLowerCase())
                        .includes(key),
                    )
                    .reduce((total, key) => total + Number(depense[key]), 0)
                }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  @click="ajouterLigne('depenses')"
                  >Ajouter une dépense
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell class="font-bold">Total</TableCell>
              <TableCell v-for="mois in mois" :key="mois">
                {{
                  depenses.reduce(
                    (total, depense) =>
                      total + Number(depense[mois.toLowerCase()]),
                    0,
                  )
                }}
              </TableCell>
              <TableCell>
                {{
                  depenses.reduce(
                    (total, depense) =>
                      total +
                      Object.keys(depense)
                        .filter((key) =>
                          mois
                            .slice(0)
                            .map((m) => m.toLowerCase())
                            .includes(key),
                        )
                        .reduce(
                          (total, key) => total + Number(depense[key]),
                          0,
                        ),
                    0,
                  )
                }}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Table class="mt-5 bg-blue-100 rounded">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[200px] font-bold">Économies</TableHead>
              <TableHead v-for="mois in mois" :key="mois">{{ mois }}</TableHead>
              <TableHead>Total</TableHead>
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
              <TableCell
                v-for="mois in mois"
                :key="`economie-${index}-${mois}`"
              >
                <Input
                  v-model="economie[mois.toLowerCase()]"
                  type="number"
                  class="w-full bg-transparent"
                />
              </TableCell>
              <TableCell>
                {{
                  Object.keys(economie)
                    .filter((key) =>
                      mois
                        .slice(0)
                        .map((m) => m.toLowerCase())
                        .includes(key),
                    )
                    .reduce((total, key) => total + Number(economie[key]), 0)
                }}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  @click="ajouterLigne('economies')"
                  >Ajouter une économie
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell class="font-bold">Total</TableCell>
              <TableCell v-for="mois in mois" :key="mois">
                {{
                  economies.reduce(
                    (total, economie) =>
                      total + Number(economie[mois.toLowerCase()]),
                    0,
                  )
                }}
              </TableCell>
              <TableCell>
                {{
                  economies.reduce(
                    (total, economie) =>
                      total +
                      Object.keys(economie)
                        .filter((key) =>
                          mois
                            .slice(0)
                            .map((m) => m.toLowerCase())
                            .includes(key),
                        )
                        .reduce(
                          (total, key) => total + Number(economie[key]),
                          0,
                        ),
                    0,
                  )
                }}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
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
