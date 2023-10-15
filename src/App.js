import { useSelector } from "react-redux";
import AddBook from "./Components/Add Book/AddBook";
import BookInfo from "./Components/BookInfo/Bookinfo";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  const { error } = useSelector((state) => state.books);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr 3fr auto",
      }}
    >
      {error && <div className="alert alert-danger mb-0">{error} </div>}
      <Header></Header>
      <AddBook></AddBook>
      <BookInfo></BookInfo>
      <Footer></Footer>
    </div>
  );
}

export default App;
