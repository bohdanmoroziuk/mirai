<script setup lang="ts">
defineProps<{
  step: Step
}>()
</script>

<template>
  <div class="flex items-center gap-8">
    <div class="mr-auto">
      <h4 class="font-bold">
        {{ step.title }}
      </h4>

      <p class="text-sm text-muted mt-1">
        {{ step.description }}
      </p>
    </div>

    <StepStatusBadge :status="step.status" />

    <StepListItemMenu :step-id="step.id" />
  </div>
</template>
