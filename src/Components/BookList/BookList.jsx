import React from "react";
import Loading from "../Loading";
import { showDeleteModal, showUpdateModal } from "../../UTLS/book";
import { useDispatch } from "react-redux";

export default function BookList({ isLoading, booksArr, getBook }) {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Books List </h2>
      {isLoading ? (
        <Loading></Loading>
      ) : booksArr.length > 0 ? (
        booksArr.map((book) => (
          <div
            key={book.id}
            className="d-flex justify-content-between align-items-center gap-5 border p-3 my-3 "
          >
            <div>{book.title}</div>
            <div className="d-flex gap-3">
              <i
                className="fa-solid fa-book fa-lg text-secondary cursor-pointer"
                onClick={() => dispatch(getBook(book.id))}
              ></i>
              <i
                className="fa-solid fa-edit fa-lg text-primary cursor-pointer"
                onClick={() =>
                  showUpdateModal(
                    dispatch,
                    book.id,
                    book.title,
                    book.price,
                    book.description
                  )
                }
              ></i>
              <i
                className="fa-solid fa-trash fa-lg text-danger cursor-pointer"
                onClick={() => showDeleteModal(dispatch, book.id)}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <div>There is no book available</div>
      )}
    </div>
  );
}
