import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//get all books
export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkAPI) => {
    //handle error
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get("http://localhost:3009/books");
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//add book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, thunkAPI) => {
    //handle error
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        "http://localhost:3009/books",
        JSON.stringify(bookData),
        {
          headers: {
            "content-type": "application/json; charset=utf",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//delete book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, thunkAPI) => {
    //handle error
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`http://localhost:3009/books/${bookId}`, {
        headers: {
          "content-type": "application/json; charset=utf",
        },
      });
      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//update book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookData, thunkAPI) => {
    //handle error
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `http://localhost:3009/books/${bookData.id}`,
        JSON.stringify(bookData.data),
        {
          headers: {
            "content-type": "application/json; charset=utf",
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//get book
export const getBook = createAsyncThunk(
  "books/getBook",
  async (bookId, thunkAPI) => {
    //handle error
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`http://localhost:3009/books/${bookId}`, {
        headers: {
          "content-type": "application/json; charset=utf",
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  booksArr: [],
  isLoading: false,
  error: null,
  bookInfo: {},
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    //get all books
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksArr = action.payload.data;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //add book
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksArr.push(action.payload.data);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //delete book
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksArr = state.booksArr.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //update book
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        const bookIndex = state.booksArr.findIndex(
          (book) => book.id === action.payload.data.id
        );

        // If the book exists in the array, update it
        if (bookIndex !== -1) {
          state.booksArr[bookIndex] = action.payload.data;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //get book
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookInfo = action.payload.data;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const booksReducer = booksSlice.reducer;
