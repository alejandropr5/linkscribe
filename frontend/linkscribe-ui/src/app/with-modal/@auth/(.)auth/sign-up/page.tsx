import Modal from "@/components/modal/Modal"
import ModalHeader from "@/components/modal/ModalHeader"
import SignUp from "@/components/auth/sign-up/SignUp"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <SignUp/>
    </Modal>
  )
}