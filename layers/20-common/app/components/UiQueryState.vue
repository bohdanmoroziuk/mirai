<script setup lang="ts" generic="T, E extends Error = Error">
const props = withDefaults(
  defineProps<{
    data?: T
    error?: Nullable<E>
    fetching?: boolean
    emptyWhen?: (data?: T) => boolean
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

const empty = computed(() => {
  if (props.fetching) {
    return false
  }

  if (hasError.value) {
    return false
  }

  return props.emptyWhen?.(props.data)
})
</script>

<template>
  <template v-if="fetching">
    <slot name="fetching">
      <div class="flex justify-center">
        <UiLoader />
      </div>
    </slot>
  </template>

  <template v-else-if="hasError">
    <slot
      name="error"
      :error="error!"
    >
      <p class="text-error text-center">
        {{ error!.message }}
      </p>
    </slot>
  </template>

  <template v-else-if="empty">
    <slot name="empty">
      <p class="text-muted text-center">
        No data.
      </p>
    </slot>
  </template>

  <template v-else>
    <slot
      name="default"
      :data="data!"
    />
  </template>
</template>
