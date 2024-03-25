import Modal from "@/components/auth-modal/Modal"
import ModalHeader from "@/components/auth-modal/ModalHeader"
import SignUp from "@/components/auth/sign-up/SignUp"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <SignUp/>
    </Modal>
  )
}