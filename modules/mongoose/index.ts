import { addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'mongoose',
  },

  setup() {
    const resolver = createResolver(import.meta.url)

    addServerPlugin(resolver.resolve('./runtime/server/plugin'))
  },
})
