<script setup lang="ts">
definePageMeta({
  devOnly: true,
  layout: false,
})
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="space-y-2">
      <UButton
        to="/dev/components"
        variant="ghost"
        icon="i-lucide-arrow-left"
      >
        Components
      </UButton>

      <h1 class="text-2xl font-semibold">
        UiLoader
      </h1>

      <p class="text-muted">
        Simple shared loading spinner.
      </p>
    </div>

    <UCard>
      <template #header>
        Default state
      </template>

      <div class="flex min-h-32 items-center justify-center">
        <UiLoader />
      </div>
    </UCard>

    <UCard>
      <template #header>
        Inside UiQueryState
      </template>

      <UiQueryState
        fetching
        :empty-when="() => false"
      >
        <template #fetching>
          <div class="flex min-h-32 items-center justify-center">
            <UiLoader />
          </div>
        </template>
      </UiQueryState>
    </UCard>
  </UContainer>
</template>
