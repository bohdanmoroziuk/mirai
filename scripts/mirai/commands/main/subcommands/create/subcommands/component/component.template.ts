export const createComponentTemplate = (name: string) => {
  return `
    <script setup lang="ts">
    </script>

    <template>
      <div>
        ${name}
      </div>
    </template>
  `
}
