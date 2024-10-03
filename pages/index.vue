<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const { user, authenticated, loading, logout } = useAuth();
console.log(user)

</script>


<template>
  <div v-if="authenticated">
    <p>Bienvenue, {{ user?.name }}</p>
    <p>Home</p>
    <a href="/settings"> go to settings</a>
    <br>

    <button @click="logout">Déconnexion</button>
  </div>
  <div v-else>
    <p>Vous n'êtes pas connecté</p>
    <a href="/authentification">Connexion</a>
  </div>
</template>


<style scoped>

</style>