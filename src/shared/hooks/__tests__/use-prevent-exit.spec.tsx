import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { renderHook } from '@testing-library/react'
import {
  type Blocker,
  type BlockerFunction,
  useBlocker,
} from 'react-router-dom'
import { usePreventExit } from '../use-prevent-exit'

vi.mock('@/shared/ui/modal/hooks/use-modal')
vi.mock('react-router-dom', () => ({
  useBlocker: vi.fn(),
}))

describe('usePreventExit Hook', () => {
  let mockModal: {
    pushModal: ReturnType<typeof vi.fn>
    closeAllModals: ReturnType<typeof vi.fn>
    modalStack: never[]
  }

  let mockBlocker: Blocker

  beforeEach(() => {
    mockModal = {
      pushModal: vi.fn(),
      closeAllModals: vi.fn(),
      modalStack: [],
    }

    mockBlocker = {
      state: 'blocked' as const,
      proceed: vi.fn(),
      reset: vi.fn(),
      location: {
        pathname: '/test',
        search: '',
        hash: '',
        state: null,
        key: 'default',
      },
    } as const
    ;(useModal as jest.Mock).mockReturnValue(mockModal)
    ;(useBlocker as jest.Mock).mockReturnValue(mockBlocker)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('브라우저 이벤트 처리', () => {
    it('isDirty가 true일 때 beforeunload 이벤트를 등록한다', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

      renderHook(() => usePreventExit({ isDirty: true }))

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'beforeunload',
        expect.any(Function)
      )
    })

    it('isDirty가 false일 때 beforeunload 이벤트를 등록하지 않는다', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

      renderHook(() => usePreventExit({ isDirty: false }))

      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        'beforeunload',
        expect.any(Function)
      )
    })

    it('컴포넌트 언마운트 시 beforeunload 이벤트 리스너를 제거한다', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => usePreventExit({ isDirty: true }))
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'beforeunload',
        expect.any(Function)
      )
    })
  })

  describe('라우터 네비게이션 처리', () => {
    it('isDirty가 true이고 다른 경로로 이동 시도할 때 blocker가 동작한다', async () => {
      const mockBlocker = {
        state: 'blocked' as const,
        proceed: vi.fn(),
        reset: vi.fn(),
        location: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
      }

      vi.mocked(useBlocker).mockReturnValue(mockBlocker)

      renderHook(() => usePreventExit({ isDirty: true }))

      expect(useBlocker).toHaveBeenCalledWith(expect.any(Function))
    })

    it('isDirty가 false일 때 blocker가 동작하지 않는다', () => {
      const mockBlocker = {
        state: 'unblocked' as const,
        proceed: undefined,
        reset: undefined,
        location: undefined,
      } as const

      vi.mocked(useBlocker).mockReturnValue(mockBlocker)

      renderHook(() => usePreventExit({ isDirty: false }))

      expect(useBlocker).toHaveBeenCalledWith(expect.any(Function))
    })

    it('같은 경로 내에서의 이동은 blocker가 동작하지 않는다', () => {
      const mockBlocker = {
        state: 'unblocked' as const,
        proceed: undefined,
        reset: undefined,
        location: undefined,
      } as const

      vi.mocked(useBlocker).mockReturnValue(mockBlocker)

      renderHook(() => usePreventExit({ isDirty: true }))

      const blockerFn = vi.mocked(useBlocker).mock
        .calls[0][0] as BlockerFunction
      const result = blockerFn({
        currentLocation: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
        nextLocation: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        historyAction: 'POP' as any,
      })

      expect(result).toBe(false)
    })
  })

  describe('알림 모달 처리', () => {
    it('모달의 확인 버튼 클릭 시 이동을 진행하고 모달을 닫는다', () => {
      const mockBlocker = {
        state: 'blocked' as const,
        proceed: vi.fn(),
        reset: vi.fn(),
        location: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
      }

      const mockModal = {
        modalStack: [],
        pushModal: vi.fn().mockReturnValue('modal-id'),
        popModal: vi.fn(),
        closeAllModals: vi.fn(),
        updateModal: vi.fn(),
      }

      vi.mocked(useBlocker).mockReturnValue(mockBlocker)
      vi.mocked(useModal).mockReturnValue(mockModal)

      const { result } = renderHook(() => usePreventExit({ isDirty: true }))

      result.current.proceed()

      expect(mockModal.closeAllModals).toHaveBeenCalled()
      expect(mockBlocker.proceed).toHaveBeenCalled()
    })

    it('커스텀 알림 메시지와 버튼 레이블을 적용할 수 있다', () => {
      const mockModal = {
        modalStack: [],
        pushModal: vi.fn().mockReturnValue('modal-id'),
        closeAllModals: vi.fn(),
      }
      ;(useModal as jest.Mock).mockReturnValue(mockModal)
      ;(useBlocker as jest.Mock).mockReturnValue({
        state: 'blocked' as const,
        proceed: vi.fn(),
        reset: vi.fn(),
        location: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
      })

      const customProps = {
        isDirty: true,
        alertTitle: '커스텀 타이틀',
        alertMessage: '커스텀 메시지',
        confirmLabel: '확인',
        cancelLabel: '취소',
      }

      renderHook(() => usePreventExit(customProps))

      expect(mockModal.pushModal).toHaveBeenCalledWith(
        expect.objectContaining({
          component: expect.any(Object),
        })
      )
    })
  })

  describe('cleanup 처리', () => {
    it('훅이 언마운트될 때 열려있는 모달을 정리한다', () => {
      const mockModal = {
        modalStack: ['some-modal'],
        pushModal: vi.fn().mockReturnValue('modal-id'),
        closeAllModals: vi.fn(),
      }
      ;(useModal as jest.Mock).mockReturnValue(mockModal)
      ;(useBlocker as jest.Mock).mockReturnValue({
        state: 'blocked' as const,
        proceed: vi.fn(),
        reset: vi.fn(),
        location: {
          pathname: '/test',
          search: '',
          hash: '',
          state: null,
          key: 'default',
        },
      })

      const { unmount } = renderHook(() => usePreventExit({ isDirty: true }))
      unmount()

      expect(mockModal.closeAllModals).toHaveBeenCalled()
    })
  })
})
