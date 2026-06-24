<script setup lang="ts">
defineProps<{
  error: Error
}>()
</script>

<template>
  <p class="text-error text-center">
    {{ error.message }}
  </p>
</template>
