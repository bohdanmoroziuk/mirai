<script setup lang="ts" generic="T, E = Error">
const props = withDefaults(
  defineProps<{
    data?: T
    error?: Nullable<E>
    fetching?: boolean
    emptyWhen: (data?: T) => boolean
  }>(),
  {
    error: null,
    fetching: false,
  },
)

defineSlots<{
  fetching(): unknown
  error(props: { error: E }): unknown
  empty(): unknown
  default(props: { data: T }): unknown
}>()

const hasError = computed(() => {
  return isPresent(props.error)
})

const isEmpty = computed(() => {
  if (props.fetching) {
    return false
  }

  if (hasError.value) {
    return false
  }

  return props.emptyWhen(props.data)
})
</script>

<template>
  <template v-if="fetching">
    <slot name="fetching" />
  </template>

  <template v-else-if="hasError">
    <slot
      name="error"
      :error="error!"
    />
  </template>

  <template v-else-if="isEmpty">
    <slot name="empty" />
  </template>

  <template v-else>
    <slot
      name="default"
      :data="data!"
    />
  </template>
</template>
