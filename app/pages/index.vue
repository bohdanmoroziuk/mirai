<script setup lang="ts">
import { getErrorMessage } from '@common/shared/utils/error'
import { useLogoutMutation } from '@auth/app/queries/auth.queries'

const notification = useNotification()
const { loading, logout } = useLogoutMutation()

const handleLogout = async () => {
  try {
    await logout()
    await navigateTo('/auth/signup')
  }
  catch (error) {
    notification.error({
      title: 'Logout failed!',
      description: getErrorMessage(error),
    })
  }
}
</script>

<template>
  <div>
    <h1>
      Mirai
    </h1>
    <AuthState v-slot="{ loggedIn }">
      <UButton
        v-if="loggedIn"
        :loading
        trailing-icon="i-lucide-arrow-right"
        size="md"
        @click="handleLogout"
      >
        Logout
      </UButton>
    </AuthState>
  </div>
</template>
