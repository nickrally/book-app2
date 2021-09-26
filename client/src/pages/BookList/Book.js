import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { removeBook } from "../../api";
import "./Books.css";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

export const Book = ({ author, title, id }) => {
  const [removeClicked, setRemoveClicked] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removeBook);

  const remove = async () => {
    setRemoveClicked(true);
  };

  const confirmRemove = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries("books");
    setRemoveClicked(false);
  };

  const cancelRemove = async () => {
    setRemoveClicked(false);
  };

  return (
    <div className="box">
      <Link to={`/update-book/${id}`}>{title}</Link>
      <p>{author}</p>
      <button onClick={remove}>Remove</button>
      {removeClicked && (
        <>
          <Backdrop />
          <Modal>
            <p>Are you sure?</p>
            <button onClick={confirmRemove}>Yes</button>
            <button onClick={cancelRemove}>No</button>
          </Modal>
        </>
      )}
    </div>
  );
};
