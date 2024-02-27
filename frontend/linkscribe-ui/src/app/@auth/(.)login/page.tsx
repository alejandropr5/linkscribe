import Modal from "@/components/auth-modal/modal"
import ModalHeader from "@/components/auth-modal/modal-header"
import Login from "@/components/login/login"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <Login/>
    </Modal>
  )
}