<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const { user, authenticated } = useAuth();
</script>

<template>
  <div v-if="authenticated">
    <p>Bienvenue, {{ user?.name }}</p>
    <p>Home</p>

    <p>votre configuration est</p>
    <div>{{ user?.settings.startYear }}</div>
    <div>{{ user?.settings.lateIncome }}</div>
    <div>{{ user?.settings.lateIncomeDay }}</div>

    <a href="/settings"> go to settings</a>
    <br />
  </div>
  <Card v-else class="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Accès Restreint</CardTitle>
    </CardHeader>
    <CardContent>
      <p class="mb-4">Vous n'êtes pas connecté.</p>
      <Button asChild class="w-full">
        <a href="/authentification">Connexion</a>
      </Button>
    </CardContent>
  </Card>
</template>

<style scoped></style>
