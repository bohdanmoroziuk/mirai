<script setup lang="ts">
import { useLoginWorkflow } from '../../workflows/login.workflow'

definePageMeta({
  access: 'guest-only',
  layout: 'auth',
})

const { errorMessage, isPending, login } = useLoginWorkflow()
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-xl font-medium mb-2">
      Login to your account
    </h1>

    <div class="p-8 rounded-3xl shadow-sm">
      <LoginForm
        :loading="isPending"
        :error-message="errorMessage"
        @submit="login"
      />
    </div>

    <p class="text-sm">
      Don't have an account? <ULink to="/auth/signup">Sign up</ULink>
    </p>
  </div>
</template>
