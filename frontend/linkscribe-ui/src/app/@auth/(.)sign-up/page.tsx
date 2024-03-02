import Modal from "@/components/auth-modal/modal"
import ModalHeader from "@/components/auth-modal/modal-header"
import SignUp from "@/components/auth/sign-up/sign-up"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <SignUp/>
    </Modal>
  )
}