<script setup="ts">
import { useAuth } from "~/composables/useAuth";
const { user, authenticated } = useAuth();
</script>

<template>
  <div v-if="authenticated">
    <p>Bienvue sur la page configuration!</p>
  </div>
  <div v-else>
    <p>Vous n'êtes pas connecté</p>
    <a href="/authentification">Connexion</a>
  </div>
</template>
