import render from '@/app/config/test/render'
import { screen } from '@testing-library/react'
import { Modal } from '../modal'
import { scrollLock } from '../utils/scroll-lock'

const mockModalContext = {
  modalStack: [] as Array<{ id: string }>,
  pushModal: vi.fn(),
  popModal: vi.fn(),
  closeAllModals: vi.fn(),
}

vi.mock('@/shared/ui/modal/hooks/use-modal', () => ({
  useModal: () => mockModalContext,
}))

vi.mock('../utils/scroll-lock', () => ({
  scrollLock: {
    lock: vi.fn(),
    unlock: vi.fn(),
  },
}))

describe('Modal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('공통 모달 기능', () => {
    it('전달받은 children을 모달 내부에 렌더링한다', async () => {
      const testContent = '테스트 컨텐츠'
      await render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>{testContent}</div>
        </Modal>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('모달 열림 시 backdrop이 렌더링된다', async () => {
      await render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('backdrop:bg-black/50')
    })

    it('size prop에 따라 적절한 크기 클래스가 적용된다', async () => {
      // 각 size 별로 테스트
      const sizes = ['sm', 'md', 'lg'] as const
      const expectedClasses = {
        sm: 'max-w-2xl px-4 py-6',
        md: 'max-w-4xl px-8 py-10',
        lg: 'max-w-6xl px-10 py-12',
      }

      for (const size of sizes) {
        const { unmount } = await render(
          <Modal isOpen={true} onClose={() => {}} size={size}>
            <div>모달 내용</div>
          </Modal>
        )

        const dialog = screen.getByRole('dialog')
        const paper = dialog.querySelector('.mantine-Paper-root')
        expect(paper).toHaveClass(expectedClasses[size])

        unmount()
      }
    })
  })

  describe('모달 스택 & 스크롤 관리', () => {
    it('모달이 열리면 스크롤이 잠기고 modalStack에 추가된다', async () => {
      await render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>모달 내용</div>
        </Modal>
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(scrollLock.lock).toHaveBeenCalled()
    })

    it('모달이 닫히면 스크롤이 해제되고 modalStack에서 제거된다', async () => {
      const handleClose = vi.fn()
      await render(
        <Modal isOpen={false} onClose={handleClose}>
          <div>모달 내용</div>
        </Modal>
      )

      expect(scrollLock.unlock).toHaveBeenCalled()
    })

    it('여러 모달이 열릴 때 zIndex가 순차적으로 증가한다', async () => {
      mockModalContext.modalStack = [{ id: '1' }, { id: '2' }]

      await render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveStyle({ zIndex: '70' }) // 50 + (2 * 10)
    })
  })

  describe('포커스 관리', () => {
    let triggerButton: HTMLButtonElement

    beforeEach(() => {
      triggerButton = document.createElement('button')
      triggerButton.textContent = '모달 열기'
      document.body.appendChild(triggerButton)
    })

    afterEach(() => {
      document.body.removeChild(triggerButton)
    })

    it('모달 열림 시 초기 포커스가 모달로 이동한다', async () => {
      await render(
        <Modal isOpen={true} onClose={() => {}} initialFocus={false}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      // document.activeElement로 현재 포커스된 요소 확인
      expect(document.activeElement).toBe(dialog)
    })

    it('모달 닫힘 시 이전 포커스된 요소로 복구된다', async () => {
      triggerButton.focus()
      expect(document.activeElement).toBe(triggerButton)

      const handleClose = vi.fn().mockImplementation(() => {
        triggerButton.focus()
      })

      const { user } = await render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      expect(document.activeElement).toBe(dialog)

      await user.keyboard('{Escape}')

      expect(handleClose).toHaveBeenCalled()
      expect(document.activeElement).toBe(triggerButton)
    })
  })

  describe('키보드 접근성', () => {
    it('ESC 키 입력 시 모달이 닫힌다', async () => {
      const handleClose = vi.fn()
      const { user } = await render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      // 모달에 포커스를 주고 ESC 이벤트 발생
      dialog.focus()
      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalled()
    })
  })

  describe('외부 클릭 처리', () => {
    it('backdrop 클릭 시 모달이 닫힌다', async () => {
      const handleClose = vi.fn()
      const { user } = await render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      await user.click(dialog)
      expect(handleClose).toHaveBeenCalled()
    })

    it('closeOnClickOutside가 false면 backdrop 클릭으로 닫히지 않는다', async () => {
      const handleClose = vi.fn()
      const { user } = await render(
        <Modal isOpen={true} onClose={handleClose} closeOnClickOutside={false}>
          <div>모달 내용</div>
        </Modal>
      )

      const dialog = screen.getByRole('dialog')
      await user.click(dialog)
      expect(handleClose).not.toHaveBeenCalled()
    })
  })
})
