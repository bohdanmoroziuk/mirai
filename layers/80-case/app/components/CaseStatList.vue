<script setup lang="ts">
defineProps<{
  items: CaseStateItem[]
}>()
</script>

<template>
  <div class="flex items-center justify-start gap-4">
    <CaseStatButton
      v-for="item in items"
      :key="item.id"
      :to="item.to"
    >
      {{ item.label }}
    </CaseStatButton>
  </div>
</template>
