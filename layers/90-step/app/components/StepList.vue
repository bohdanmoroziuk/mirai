<script setup lang="ts">
defineProps<{
  steps: Step[]
}>()
</script>

<template>
  <div class="border border-muted rounded-md p-4">
    <StepListItem
      v-for="step of steps"
      :key="step.id"
      :step
    />
  </div>
</template>
