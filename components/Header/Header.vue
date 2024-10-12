<script setup lang="ts">
import { ref } from "vue";
import { LayoutDashboard, Calendar, CreditCard, Menu } from "lucide-vue-next";
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
];
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between w-full"
    >
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="font-bold text-lg">Budget Dashboard</span>
        </NuxtLink>
      </div>

      <nav
        class="hidden md:flex items-center justify-center flex-1 space-x-6 text-sm font-medium"
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

      <div class="flex items-center space-x-4">
        <Sheet v-model="isOpen">
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              class="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
              <Avatar class="h-8 w-8">
                <AvatarImage src="#" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-56"
            align="end"
            side="bottom"
            :alignOffset="-5"
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
            <a href="/settings">
              <DropdownMenuItem>Paramètres</DropdownMenuItem></a
            >
            <DropdownMenuItem @click="logout">
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
