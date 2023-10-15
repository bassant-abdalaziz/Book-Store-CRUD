import Swal from "sweetalert2";
import { addBook, deleteBook, updateBook } from "../Redux/bookSlice";

// *=========> ADD Book
// ^[1] show modal [title,price, description]
export function showAddModal(dispatch) {
  Swal.fire({
    title: "Add Book 📘",
    html: `
      <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control mb-3"/>
      <input type="number" inputMode="numeric" placeholder="Enter a Price" id="price" name="price" class="form-control"/>
      <textarea type="text" placeholder="Enter a Description" id="description" name="description" class="form-control mt-3"></textarea>
      `,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,

    // result of this function will be passed to allowOutsideClick
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
      return { title, price, description }; // {title: title, price: price, description: description}
    },

    //result here object inside (title , price , description)
    allowOutsideClick: () => !Swal.isLoading(),
    customClass: {
      confirmButton: "add-button",
    },
  }).then((result) => {
    // console.log(result); // {title: "learn react", price: 150,description: "learn react"}

    // ^[2] send data from inputs to API
    if (result.value) {
      dispatch(
        addBook({
          title: result.value.title,
          price: result.value.price,
          description: result.value.description,
        })
      ).then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "book is added successfully 💙",
        });
      });
    }
  });
}

// *=========> Delete Book
export function showDeleteModal(dispatch, id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteBook(id)).then(() =>
        Swal.fire("Deleted!", "Your book has been deleted 😢", "success")
      );
    }
  });
}

// *=========> Update Book
// ^[1] show modal [title,price, description]
export function showUpdateModal(
  dispatch,
  id,
  prevTitle,
  prevPrice,
  prevDescription
) {
  Swal.fire({
    title: "Update Book 📘",
    html: `
      <input type="text" value="${prevTitle}" placeholder="Enter a Title" id="title" name="title" class="form-control mb-3"/>
      <input type="number" inputMode="numeric" value="${prevPrice}" placeholder="Enter a Price" id="price" name="price" class="form-control"/>
      <textarea type="text"  placeholder="Enter a Description" id="description" name="description" class="form-control mt-3">${prevDescription}</textarea>
      `,
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,

    preConfirm: () => {
      const title = document.getElementById("title").value;
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
      return { title, price, description }; // {title: title, price: price, description: description}
    },

    allowOutsideClick: () => !Swal.isLoading(),
    customClass: {
      confirmButton: "update-button",
    },
  }).then((result) => {
    console.log(result);
    // ^[2] send data from inputs to API
    if (result.value) {
      dispatch(
        updateBook({
          id: id,
          data: {
            title: result.value.title,
            price: result.value.price,
            description: result.value.description,
          },
        })
      ).then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "book is updated successfully💙",
        });
      });
    }
  });
}
