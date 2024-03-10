import Modal from "@/components/auth-modal/modal"
import ModalHeader from "@/components/auth-modal/modal-header"
import Login from "@/components/auth/login/login"
import AuthRedirect from "@/components/hoc/auth-redirect"

function LoginModal() {
  return (
    <Modal>
      <ModalHeader/>
      <Login/>
    </Modal>
  )
}

export default AuthRedirect(LoginModal)
