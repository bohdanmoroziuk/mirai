<template>
  <div class="toolbox row items-center justify-between q-gutter-x-md">
    <div class="toolbox-group row items-center q-gutter-x-sm">
      <q-btn
        color="primary"
        icon="add"
        label="Add note"
      />
    </div>
    <div class="toolbox-group" style="flex: 1;">
      <q-input
        v-model.trim="searchTerm"
        placeholder="Search"
        debounce="500"
        dense
      />
    </div>
    <div class="toolbox-group">
      <div class="q-gutter-sm">
        <q-radio v-model="view" val="list" label="List" />
        <q-radio v-model="view" val="grid" label="Grid" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchTerm = ref('');

const view = ref('grid');
</script>
