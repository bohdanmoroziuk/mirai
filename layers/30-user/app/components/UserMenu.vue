<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useLogoutWorkflow } from '@auth/app/workflows/logout.workflow'

const { isLoggingOut, logout } = useLogoutWorkflow()

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Tag Manager',
      icon: 'i-lucide-tags',
      to: '/settings/tags',
    },
  ],
  [
    {
      label: 'Log out',
      icon: 'i-lucide-log-out',
      disabled: toValue(isLoggingOut),
      onSelect: logout,
    },
  ],
])
</script>

<template>
  <AuthState>
    <template #default="{ loggedIn, user }">
      <UDropdownMenu
        v-if="loggedIn"
        :items="userItems"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
      >
        <UButton
          :loading="isLoggingOut"
          :label="user.name"
          trailing-icon="i-lucide-chevrons-up-down"
          color="neutral"
          variant="ghost"
          square
          class="w-full data-[state=open]:bg-elevated overflow-hidden"
          :ui="{
            trailingIcon: 'text-dimmed ms-auto',
          }"
        />
      </UDropdownMenu>
    </template>
  </AuthState>
</template>
