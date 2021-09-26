import { Link } from "react-router-dom";
import { Container } from "./Container";
import "../pages/BookList/Books.css";

export const Navbar = () => {
  return (
    <div className="header">
      <Container>
        <Link to="/">BOOKS</Link>
        <Link to="/create-book">Add new book</Link>
      </Container>
    </div>
  );
};
