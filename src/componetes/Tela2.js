import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Dia from "./Dia";

export default function Tela2() {
  const { idFilme } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v7/cineflex/movies/${idFilme}/showtimes`;

  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const promise = axios.get(URL);
    promise.then((response) => {
      const { data } = response;
      console.log(data);
      setFilme(data);
    });
    promise.catch((err) => {
      alert("Deu ruim");
      console.log(err.response.statusText);
    });
  }, []);

  function renderizarDias() {
    if (filme !== null) {
      return filme.days.map((dia) => {
        const { weekday, date, showtimes, id } = dia;
        return <Dia key={id} dia={weekday} date={date} sessoes={showtimes} />;
      });
    } else {
      return <p>Carregando...</p>;
    }
  }

  function renderizarFooter() {
    if (filme !== null) {
      return (
        <>
          <img src={filme.posterURL} alt={filme.title} />
          <h1>{filme.title}</h1>
        </>
      );
    } else {
      return <p>Carregando...</p>;
    }
  }

  const dias = renderizarDias();
  const footer = renderizarFooter();
  return (
    <Conteudo>
      <h1>Selecione o horário</h1>
      <Dias>{dias}</Dias>
      <Footer>{footer}</Footer>
    </Conteudo>
  );
}

const Dias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: #dfe6ed;

  img {
    width: 48px;
    height: 72px;
    padding: 8px;
    background-color: white;
    border-radius: 2px;
    margin: 10px;
    box-shadow: 0px 2px 4px 0px #0000001a;
    border: 1px solid #9eadba;
  }

  h1 {
    font-size: 26px;
  }
`;
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
