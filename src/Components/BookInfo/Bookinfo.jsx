import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, getBook } from "../../Redux/bookSlice";

import BookList from "../BookList/BookList";
import BookDetails from "../BookDetails/BookDetails";

export default function BookInfo() {
  const { isLoading, booksArr, bookInfo } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="book d-flex justify-content-between gap-3">
        <BookList
          isLoading={isLoading}
          booksArr={booksArr}
          getBook={getBook}
        ></BookList>
        <BookDetails bookInfo={bookInfo}></BookDetails>
      </div>
    </div>
  );
}
