import { onMounted, onUnmounted } from 'vue'

let globalObserver: IntersectionObserver | null = null
const observerElements = new Set<Element>()

export function useScrollAnimation(selector: string = '.animate-on-scroll') {
  onMounted(() => {
    if (!globalObserver) {
      globalObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              
              // Handle custom refs from setupAnimation
              const animRef = (entry.target as any)._animRef
              if (animRef && animRef.value) {
                animRef.value.isVisible = true
                animRef.value.hasAnimated = true
              }
              
              globalObserver?.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )
    }

    // Observe default selector
    setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        if (!observerElements.has(el)) {
          globalObserver?.observe(el)
          observerElements.add(el)
        }
      })
    }, 100)
  })

  return {
    initScrollAnimations: () => {},
    animateOnScroll: { class: 'animate-on-scroll' },
    staggerChildren: 'stagger-children',
    setupAnimation: (elementRef: any, animRef: any, options: any = {}) => {
      setTimeout(() => {
        if (elementRef.value) {
          elementRef.value.classList.add('animate-on-scroll')
          if (options.delay) {
            elementRef.value.style.transitionDelay = `${options.delay}ms`
          }
          ;(elementRef.value as any)._animRef = animRef
          
          if (globalObserver && !observerElements.has(elementRef.value)) {
            globalObserver.observe(elementRef.value)
            observerElements.add(elementRef.value)
          }
        }
      }, 100)
    },
    getAnimClass: (animRef: any) => {
      return ['animate-on-scroll', animRef?.value?.isVisible ? 'is-visible' : '']
    }
  }
}
