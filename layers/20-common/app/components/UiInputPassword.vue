<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'

const props = defineProps<Pick<InputProps, 'placeholder' | 'autocomplete' | 'disabled'>>()

const password = defineModel<string>({ default: '' })

const [shown, toggle] = useToggle()
</script>

<template>
  <UInput
    v-model="password"
    v-bind="props"
    :type="shown ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="shown ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="shown ? 'Hide password' : 'Show password'"
        :aria-pressed="shown"
        aria-controls="password"
        @click="toggle()"
      />
    </template>
  </UInput>
</template>

<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
    display: none;
}
</style>
