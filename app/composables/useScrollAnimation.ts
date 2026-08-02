import { onMounted, type Ref } from 'vue'

// Interface for state reactive object
export interface AnimState {
  isVisible?: boolean
  hasAnimated?: boolean
}

// Interface for optional animation setup parameters
export interface AnimationOptions {
  delay?: number
}

// Extend Element to safely attach custom properties without using 'any'
interface AnimatedElement extends Element {
  _animRef?: Ref<AnimState>
}

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

              // Cast to custom interface instead of 'any'
              const animRef = (entry.target as AnimatedElement)._animRef
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
    setupAnimation: (
      elementRef: Ref<HTMLElement | null>,
      animRef: Ref<AnimState>,
      options: AnimationOptions = {}
    ) => {
      setTimeout(() => {
        if (elementRef.value) {
          elementRef.value.classList.add('animate-on-scroll')
          if (options.delay) {
            elementRef.value.style.transitionDelay = `${options.delay}ms`
          }
          // Cast elementRef.value to AnimatedElement
          ;(elementRef.value as AnimatedElement)._animRef = animRef

          if (globalObserver && !observerElements.has(elementRef.value)) {
            globalObserver.observe(elementRef.value)
            observerElements.add(elementRef.value)
          }
        }
      }, 100)
    },
    getAnimClass: (animRef?: Ref<AnimState>) => {
      return ['animate-on-scroll', animRef?.value?.isVisible ? 'is-visible' : '']
    }
  }
}
