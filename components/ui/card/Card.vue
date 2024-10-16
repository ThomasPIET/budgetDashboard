<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  noBorder?: boolean;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg bg-card text-card-foreground ',
        !props.noBorder && 'border' && 'shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
