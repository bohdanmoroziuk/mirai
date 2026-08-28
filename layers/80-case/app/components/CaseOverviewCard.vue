<script setup lang="ts">
defineProps<{
  caseOverview: CaseOverview
}>()
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg overflow-hidden bg-default ring ring-default w-full p-4">
    <h3 class="font-bold">
      {{ caseOverview.title }}
    </h3>

    <template v-if="caseOverview.description">
      <p class="text-sm text-muted">
        {{ caseOverview.description }}
      </p>
    </template>

    <div class="flex items-center gap-2">
      <UProgress
        :model-value="3"
        :max="5"
      />

      <p class="text-sm text-muted text-nowrap">
        3 / 5 steps
      </p>
    </div>

    <USeparator />

    <div class="flex items-center gap-1">
      <p class="text-muted">
        Next:
      </p>
      <ULink
        class="text-black"
        to="/cases"
      >
        Pick up the rental car
      </ULink>
    </div>
  </div>
</template>
