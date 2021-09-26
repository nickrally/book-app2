import { useQuery } from "react-query";
import { getAllBooks } from "../../api";
import { Container } from "../../shared/Container";
import { Book } from "./Book";
import "./Books.css";

export const BookList = () => {
  const { data, error, isLoading, isError } = useQuery("books", getAllBooks);
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError) {
    return <span>Error {error.message}</span>;
  }
  return (
    <Container>
      <div className="wrapper">
        {data.map(({ id, title, author }) => (
          <Book author={author} title={title} id={id} key={id} />
        ))}
      </div>
    </Container>
  );
};
