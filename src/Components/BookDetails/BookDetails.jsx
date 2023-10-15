import React from "react";

export default function BookDetails({ bookInfo }) {
  return (
    <div>
      <h2>Book Details</h2>
      {Object.keys(bookInfo).length > 0 ? (
        <div>
          <p>
            <span className="fw-bold">Title : </span> {bookInfo.title}
          </p>
          <p>
            <span className="fw-bold">Price : </span> {bookInfo.price}
          </p>
          <p>
            <span className="fw-bold">Description : </span>
            {bookInfo.description}
          </p>
        </div>
      ) : (
        <div className="alert alert-secondary">
          There is no selected book, please select one 💙
        </div>
      )}
    </div>
  );
}
