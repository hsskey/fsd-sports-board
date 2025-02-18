interface ScrollState {
  position: number
  style: string
}

interface ScrollLockState {
  lockCount: number
  scrollState: ScrollState | null
}

const state: ScrollLockState = {
  lockCount: 0,
  scrollState: null,
}

function lock() {
  state.lockCount++

  if (state.lockCount === 1) {
    state.scrollState = {
      position: window.scrollY,
      style: document.body.style.cssText,
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.cssText = `
      position: fixed;
      top: -${state.scrollState.position}px;
      left: 0;
      right: 0;
      bottom: 0;
      padding-right: ${scrollbarWidth}px;
      overflow: hidden;
    `
  }
}

function unlock() {
  if (state.lockCount === 0) return

  state.lockCount--

  if (state.lockCount === 0 && state.scrollState) {
    document.body.style.cssText = state.scrollState.style
    window.scrollTo(0, state.scrollState.position)
    state.scrollState = null
  }
}

export const scrollLock = {
  lock,
  unlock,
}
