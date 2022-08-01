import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Filme from "./Filme";
export default function Tela1() {
  const URL = "https://mock-api.driven.com.br/api/v7/cineflex/movies";
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const promise = axios.get(URL);
    promise.then((response) => {
      const { data } = response;
      setFilmes(data);
    });
    promise.catch((err) => {
      alert("Deu ruim");
      console.log(err.response.statusText);
    });
  }, []);

  function renderizarFilmes() {
    if (filmes.length > 0) {
      return filmes.map((filme) => {
        const { id, posterURL, title } = filme;
        return <Filme key={id} id={id} poster={posterURL} titulo={title} />;
      });
    }
    return <h1>Carregando...</h1>;
  }

  const filmesParaExibir = renderizarFilmes();
  return (
    <Conteudo>
      <h1>Selecione o filme</h1>
      <Filmes>{filmesParaExibir}</Filmes>
    </Conteudo>
  );
}

const Conteudo = styled.div`
  margin: 70px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    height: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Filmes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
