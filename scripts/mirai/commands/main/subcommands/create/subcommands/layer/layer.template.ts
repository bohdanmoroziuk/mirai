export const createNuxtConfigTemplate = (
  name: string,
  description: string = '',
) => {
  return `
    export default defineNuxtConfig({
      $meta: {
        name: '${name}',
        description: '${description}',
      },
    })
  `
}
