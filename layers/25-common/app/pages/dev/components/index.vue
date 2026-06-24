<script setup lang="ts">
definePageMeta({
  layout: false,
  devOnly: true,
})

const componentLinks = [
  {
    label: 'UiInputPassword',
    description: 'Password input with visibility toggling.',
    to: '/dev/components/ui-input-password',
  },
  {
    label: 'UiQueryState',
    description: 'Handles fetching, error, empty and success states.',
    to: '/dev/components/ui-query-state',
  },
  {
    label: 'UiLoader',
    description: 'Simple shared loading spinner.',
    to: '/dev/components/ui-loader',
  },
]
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div>
      <h1 class="text-2xl font-semibold">
        Shared Components
      </h1>

      <p class="mt-2 text-muted">
        Development-only previews for shared components.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <UCard
        v-for="componentLink in componentLinks"
        :key="componentLink.to"
      >
        <template #header>
          <NuxtLink
            :to="componentLink.to"
            class="font-medium hover:underline"
          >
            {{ componentLink.label }}
          </NuxtLink>
        </template>

        <p class="text-sm text-muted">
          {{ componentLink.description }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
