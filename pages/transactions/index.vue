<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
const { user, authenticated } = useAuth();
</script>

<template>
  <div v-if="authenticated">
    <h3>Page Transaction</h3>
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

<style scoped></style>
