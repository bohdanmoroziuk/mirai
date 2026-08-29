<script setup lang="ts">
const caseId = useRouteParams<string>('caseId')
</script>

<template>
  <div>
    Case: {{ caseId }}
  </div>
</template>
