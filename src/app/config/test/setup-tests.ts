import { afterAll, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom'

// Dialog Element 메서드 모킹
window.HTMLDialogElement.prototype.show = vi.fn()
window.HTMLDialogElement.prototype.showModal = vi.fn(() => {
  const dialog = document.querySelector('dialog')
  if (dialog) {
    dialog.setAttribute('open', '')
    dialog.setAttribute('role', 'dialog')
  }
})
window.HTMLDialogElement.prototype.close = vi.fn(() => {
  const dialog = document.querySelector('dialog')
  if (dialog) {
    dialog.removeAttribute('open')
  }
})

// dialog 포커스 관련 설정 추가
HTMLElement.prototype.focus = function () {
  if (document.activeElement && 'blur' in document.activeElement) {
    ;(document.activeElement as HTMLElement).blur()
  }
  Object.defineProperty(document, 'activeElement', {
    writable: true,
    value: this,
  })
}

HTMLElement.prototype.blur = () => {
  Object.defineProperty(document, 'activeElement', {
    writable: true,
    value: document.body,
  })
}

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks()
})

window.scrollTo = vi.fn()

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
