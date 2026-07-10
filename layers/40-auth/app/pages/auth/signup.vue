<script setup lang="ts">
import { useSignupWorkflow } from '../../workflows/signup.workflow'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const { errorMessage, isSigningUp, signup } = useSignupWorkflow()
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-xl font-medium mb-2">
      Create an account
    </h1>

    <div class="p-8 rounded-3xl shadow-sm">
      <SignupForm
        :submitting="isSigningUp"
        :error-message="errorMessage"
        @submit="signup"
      />
    </div>

    <p class="text-sm">
      Already have an account? <ULink to="/auth/login">Log in</ULink>
    </p>
  </div>
</template>
