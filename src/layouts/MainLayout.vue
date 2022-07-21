<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Mirai
        </q-toolbar-title>

        <div class="q-gutter-x-sm">
          <q-btn dense flat round icon="notifications" />
          <q-btn dense flat round icon="person" :to="{ name: 'account' }" />
          <q-btn dense flat round icon="info" :to="{ name: 'info' }" />
          <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="flex column full-height">
        <div class="link-group q-mb-auto">
          <q-list>
            <q-item-label header>Tasks</q-item-label>
            <q-item clickable v-ripple :to="{ name: 'inbox' }">
              <q-item-section avatar>
                <q-icon color="primary" name="inbox" />
              </q-item-section>
              <q-item-section>Inbox</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'today' }">
              <q-item-section avatar>
                <q-icon color="green" name="folder" />
              </q-item-section>
              <q-item-section>Today</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'overdue' }">
              <q-item-section avatar>
                <q-icon color="red" name="folder_off" />
              </q-item-section>
              <q-item-section>Overdue</q-item-section>
            </q-item>
            <q-separator />
            <q-item-label header>Notes</q-item-label>
            <q-item clickable v-ripple :to="{ name: 'notes' }">
              <q-item-section avatar>
                <q-icon color="primary" name="note_alt" />
              </q-item-section>
              <q-item-section>Notes</q-item-section>
            </q-item>
            <q-separator />
            <q-item-label header>Weather</q-item-label>
            <q-item clickable v-ripple :to="{ name: 'weather' }">
              <q-item-section avatar>
                <q-icon color="primary" name="sunny" />
              </q-item-section>
              <q-item-section>Weather</q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator />
        <div class="link-group">
        </div>
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-center text-body">Mirai 2022</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
