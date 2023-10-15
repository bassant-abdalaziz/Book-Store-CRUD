import React from "react";
import { showAddModal } from "../../UTLS/book";
import { useDispatch } from "react-redux";

export default function AddBook() {
  const dispatch = useDispatch();
  return (
    <div className="container my-5">
      <button
        className="btn btn-primary"
        onClick={() => showAddModal(dispatch)}
      >
        <i className="fa-solid fa-plus"></i> New Book
      </button>
    </div>
  );
}
