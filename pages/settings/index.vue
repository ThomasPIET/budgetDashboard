<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const { user, authenticated, loading, logout } = useAuth();
</script>

<template>
  <div v-if="authenticated">
    <p>Bienvenue, {{ user?.name }}</p>
    <p>settings</p>

    <button @click="logout">Déconnexion</button>
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
