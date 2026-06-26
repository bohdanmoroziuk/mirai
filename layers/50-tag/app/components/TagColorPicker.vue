<script setup lang="ts">
import type { ColorPickerProps } from '@nuxt/ui'

withDefaults(
  defineProps<
    {
      label?: string
    }
    & Pick<
      ColorPickerProps,
      | 'disabled'
      | 'format'
    >
  >(),
  {
    label: 'Choose color',
    format: 'rgb',
    disabled: false,
  },
)

const color = defineModel<string>()

const chipStyle = computed(() => ({ backgroundColor: color.value }))
</script>

<template>
  <UPopover>
    <UButton
      :label
      color="neutral"
      variant="outline"
    >
      <template #leading>
        <span
          :style="chipStyle"
          class="size-3 rounded-full"
        />
      </template>
    </UButton>

    <template #content>
      <UColorPicker
        v-model="color"
        :disabled
        :format
        class="p-2"
      />
    </template>
  </UPopover>
</template>
