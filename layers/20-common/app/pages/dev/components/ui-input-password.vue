<script setup lang="ts">
definePageMeta({
  layout: false,
  devOnly: true,
})

const emptyPassword = ref('')
const filledPassword = ref('secret-password')
const disabledPassword = ref('disabled-password')
const invalidPassword = ref('')

const signupPassword = ref('')
const signupPasswordConfirmation = ref('')
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="space-y-2">
      <UButton
        to="/dev/components"
        variant="ghost"
        icon="i-lucide-arrow-left"
      >
        Components
      </UButton>

      <h1 class="text-2xl font-semibold">
        UiInputPassword
      </h1>

      <p class="text-muted">
        Password input with visibility toggling.
      </p>
    </div>

    <UCard>
      <template #header>
        Empty state
      </template>

      <UFormField
        label="Password"
        name="emptyPassword"
      >
        <UiInputPassword
          v-model="emptyPassword"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        Filled state
      </template>

      <UFormField
        label="Password"
        name="filledPassword"
      >
        <UiInputPassword
          v-model="filledPassword"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        Signup state
      </template>

      <div class="space-y-4">
        <UFormField
          label="Password"
          name="password"
        >
          <UiInputPassword
            v-model="signupPassword"
            placeholder="Create a password"
            autocomplete="new-password"
          />
        </UFormField>

        <UFormField
          label="Confirm password"
          name="passwordConfirmation"
        >
          <UiInputPassword
            v-model="signupPasswordConfirmation"
            placeholder="Confirm your password"
            autocomplete="new-password"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        Invalid state
      </template>

      <UFormField
        label="Password"
        name="invalidPassword"
        error="Password is required"
      >
        <UiInputPassword
          v-model="invalidPassword"
          placeholder="Enter your password"
          autocomplete="current-password"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        Disabled state
      </template>

      <UFormField
        label="Password"
        name="disabledPassword"
      >
        <UiInputPassword
          v-model="disabledPassword"
          placeholder="Enter your password"
          autocomplete="current-password"
          disabled
        />
      </UFormField>
    </UCard>
  </UContainer>
</template>
