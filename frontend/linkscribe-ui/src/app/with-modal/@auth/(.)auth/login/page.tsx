import Modal from "@/components/modal/Modal"
import ModalHeader from "@/components/modal/ModalHeader"
import Login from "@/components/auth/login/Login"

export default function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <Login/>
    </Modal>
  )
}
