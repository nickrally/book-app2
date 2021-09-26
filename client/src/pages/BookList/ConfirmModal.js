import Backdrop from "./Backdrop";
import Modal from "./Modal";
import "./ConfirmModal.css";

const ConfirmModal = ({ confirm, cancel }) => {
  return (
    <>
      <Backdrop />
      <Modal>
        <p>Are you sure?</p>
        <button onClick={confirm}>Yes</button>
        <button onClick={cancel}>No</button>
      </Modal>
    </>
  );
};

export default ConfirmModal;
