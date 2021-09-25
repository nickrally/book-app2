import { Link } from "react-router-dom";
import { Container } from "./Container";

export const Navbar = () => {
  return (
    <div>
      <Container>
        <Link to="/">BOOKS</Link>
        <Link to="/create-book">Add new book</Link>
      </Container>
    </div>
  );
};
