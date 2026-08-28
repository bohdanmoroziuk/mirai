<script setup lang="ts">
definePageMeta({
  pageTitle: 'Cases',
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <CaseToolbar />
    <CaseStats />
    <CaseOverviews />
  </div>
</template>
