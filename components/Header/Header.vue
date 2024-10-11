<script setup="ts">
import { ref } from "vue";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  CreditCard,
  Menu,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "~/composables/useAuth";

const { user, logout } = useAuth();
const isOpen = ref(false);

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Planning", href: "/planning", icon: Calendar },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between w-full"
    >
      <!-- Titre aligné à gauche -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-bold">Budget Dashboard</span>
        </NuxtLink>
      </div>

      <!-- Navigation centrée -->
      <nav
        class="flex items-center justify-center flex-1 space-x-6 text-sm font-medium mx-auto"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center"
        >
          <component :is="item.icon" class="h-4 w-4 mr-2" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Avatar aligné à droite -->
      <div class="flex items-center">
        <Sheet v-model="isOpen">
          <SheetTrigger as-child>
            <Button
              variant="ghost"
              class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
            >
              <Menu class="h-6 w-6" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="pr-0">
            <nav class="flex flex-col gap-4">
              <NuxtLink
                v-for="item in navItems"
                :key="item.href"
                :to="item.href"
                class="flex items-center text-lg font-semibold"
                @click="isOpen = false"
              >
                <component :is="item.icon" class="mr-2 h-5 w-5" />
                {{ item.name }}
              </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
              <Avatar class="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-56"
            align="end"
            side="bottom"
            alignOffset="{-5}"
          >
            <DropdownMenuLabel class="font-normal">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ user?.name }}
                </p>
                <p class="text-xs leading-none text-muted-foreground">
                  {{ user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem @click="logout">
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
