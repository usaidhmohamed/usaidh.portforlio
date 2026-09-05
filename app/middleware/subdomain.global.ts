export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    const event = useRequestEvent()
    const host = event?.node?.req?.headers?.host || ''
    if (host.startsWith('beta.') && to.path === '/') {
      return navigateTo('/beta')
    }
  } else if (import.meta.client) {
    const host = window.location.hostname
    if (host.startsWith('beta.') && to.path === '/') {
      return navigateTo('/beta')
    }
  }
})
