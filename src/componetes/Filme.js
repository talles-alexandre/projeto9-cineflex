import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Filme(props) {
  const { id, poster, titulo } = props;
  return (
    <Link to={`/sessoes/${id}`}>
      <Poster>
        <img src={poster} alt={titulo} />
      </Poster>
    </Link>
  );
}
const Poster = styled.div`
  padding: 8px;
  background-color: white;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  margin: 10px 15px;
  cursor: pointer;

  img {
    height: 190px;
    width: 130px;
  }
`;
