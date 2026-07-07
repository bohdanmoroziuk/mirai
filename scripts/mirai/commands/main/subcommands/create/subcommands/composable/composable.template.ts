export const createComposableTemplate = (name: string) => {
  return `
    export const ${name} = () => {
      // composable logic here
    }
  `
}
