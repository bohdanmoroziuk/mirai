<script setup lang="ts">
const caseId = useRouteParams<string>('caseId')
</script>

<template>
  <div class="flex flex-col gap-8">
    <div>
      Case: {{ caseId }}
    </div>

    <StepListManager :case-id />
  </div>
</template>
