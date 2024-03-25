import Modal from "@/components/auth-modal/Modal"
import ModalHeader from "@/components/auth-modal/ModalHeader"
import Login from "@/components/auth/login/Login"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <Login/>
    </Modal>
  )
}
