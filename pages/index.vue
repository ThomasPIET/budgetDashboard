<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

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
  <div v-else>
    <p>Vous n'êtes pas connecté</p>
    <a href="/authentification">Connexion</a>
  </div>
</template>

<style scoped></style>
