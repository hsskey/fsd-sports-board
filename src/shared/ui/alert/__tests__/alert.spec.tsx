import render from '@/app/config/test/render'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Alert } from '../alert'

const mockPopModal = vi.fn()
const mockPushModal = vi.fn()

vi.mock('@/shared/ui/modal/hooks/use-modal', () => ({
  useModal: () => ({
    popModal: mockPopModal,
    pushModal: mockPushModal,
    modalStack: [],
  }),
}))

describe('Alert 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('렌더링', () => {
    it('메시지가 정상적으로 표시된다', async () => {
      await render(<Alert isOpen={true} message="테스트 메시지" />)
      expect(screen.getByText('테스트 메시지')).toBeInTheDocument()
    })

    it('제목이 있는 경우 제목이 표시된다', async () => {
      await render(<Alert isOpen={true} message="메시지" title="제목" />)
      expect(screen.getByText('제목')).toBeInTheDocument()
    })
  })

  describe('이벤트 핸들링', () => {
    it('확인 버튼 클릭시 onConfirm과 popModal이 호출된다', async () => {
      const onConfirm = vi.fn()
      const { user } = await render(
        <Alert isOpen={true} message="메시지" onConfirm={onConfirm} />
      )
      await user.click(screen.getByText('확인'))
      expect(onConfirm).toHaveBeenCalledTimes(1)
      expect(mockPopModal).toHaveBeenCalledTimes(1)
    })

    it('type이 confirm일 때 취소 버튼 클릭시 onClose와 popModal이 호출된다', async () => {
      const onClose = vi.fn()
      const { user } = await render(
        <Alert
          isOpen={true}
          type="confirm"
          message="메시지"
          onClose={onClose}
        />
      )
      await user.click(screen.getByText('취소'))
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(mockPopModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('커스터마이징', () => {
    it('버튼 텍스트를 커스터마이징할 수 있다', async () => {
      await render(
        <Alert
          isOpen={true}
          message="메시지"
          confirmLabel="커스텀 확인"
          cancelLabel="커스텀 취소"
          type="confirm"
        />
      )
      expect(screen.getByText('커스텀 확인')).toBeInTheDocument()
      expect(screen.getByText('커스텀 취소')).toBeInTheDocument()
    })

    it('preventClose 옵션이 동작한다', async () => {
      const onClose = vi.fn()
      await render(
        <Alert
          isOpen={true}
          message="메시지"
          preventClose={true}
          onClose={onClose}
        />
      )
      expect(mockPopModal).not.toHaveBeenCalled()
    })
  })
})
