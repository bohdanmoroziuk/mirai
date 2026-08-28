<script setup lang="ts">
defineProps<{
  caseOverviews: CaseOverview[]
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <CaseOverviewCard
      v-for="caseOverview of caseOverviews"
      :key="caseOverview.id"
      :case-overview="caseOverview"
    />
  </div>
</template>
