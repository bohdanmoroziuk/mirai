<script setup lang="ts">
import { toSignupInput } from '../../mappers/auth-input.mapper'
import { useSignupWorkflow } from '../../workflows/signup.workflow'
import type { SignupFormState } from '../../types/auth'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const { error, isSigningUp, signup } = useSignupWorkflow()

const errorMessage = useMappedValueOr(error, getErrorMessage, null)

const handleSignup = async (state: SignupFormState) => {
  await signup(toSignupInput(state))
}
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
        @submit="handleSignup"
      />
    </div>

    <p class="text-sm">
      Already have an account? <ULink to="/auth/login">Log in</ULink>
    </p>
  </div>
</template>
