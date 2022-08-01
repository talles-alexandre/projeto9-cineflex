import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Assento from "./Assento";

export default function Tela3(props) {
  const { finalizar } = props;
  const { idSessao } = useParams();
  const [assentosSelecionados, setAssentosSelecionados] = useState(new Map());
  const [sessao, setSessao] = useState(null);
  const [dadosCompra, setDadosCompra] = useState({ nome: "", cpf: "" });
  const URL = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`;

  const promise = axios.get(URL);
  const navigate = useNavigate();
  useEffect(() => {
    promise.then((response) => {
      const { data } = response;
      console.log(data);
      setSessao(data);
    });
    promise.catch((err) => {
      alert("Deu ruim");
      console.log(err.response.statusText);
    });
  }, []);

  function toggle(id, numero) {
    const jaSelecionado = assentosSelecionados.has(id);
    if (jaSelecionado) {
      assentosSelecionados.delete(id);
      setAssentosSelecionados(new Map(assentosSelecionados));
    } else {
      setAssentosSelecionados(new Map(assentosSelecionados.set(id, numero)));
    }
  }

  function renderizarAssentos() {
    if (sessao !== null) {
      return sessao.seats.map((seat) => {
        const { id, name, isAvailable } = seat;

        const selecionado = assentosSelecionados.has(id);

        return (
          <Assento
            key={id}
            id={id}
            numero={name}
            disponivel={isAvailable}
            selecionado={selecionado}
            aoSelecionar={(id, numero) => toggle(id, numero)}
          />
        );
      });
    }
  }

  function renderizarLegenda() {
    return (
      <>
        <AssentoLegenda cor="#8DD7CF">
          <button></button>
          <p>Selecionado</p>
        </AssentoLegenda>
        <AssentoLegenda>
          <button></button>
          <p>Disponível</p>
        </AssentoLegenda>
        <AssentoLegenda cor="#FBE192">
          <button></button>
          <p>Indidponível</p>
        </AssentoLegenda>
      </>
    );
  }

  function renderizarFooter() {
    if (sessao !== null) {
      return (
        <>
          <img src={sessao.movie.posterURL} alt={sessao.movie.title} />
          <div>
            <p>{sessao.movie.title}</p>
            <p>
              {sessao.day.weekday} - {sessao.name}
            </p>
          </div>
        </>
      );
    } else {
      return <p>Carregando ...</p>;
    }
  }

  const assentos = renderizarAssentos();
  const legenda = renderizarLegenda();
  const footer = renderizarFooter();

  function confirmarCompra(event) {
    event.preventDefault();
    const URL = `https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`;

    const promise = axios.post(URL, {
      ids: [...assentosSelecionados.keys()],
      name: dadosCompra.nome,
      cpf: dadosCompra.cpf,
    });

    promise.then((response) => {
      finalizar({
        filme: sessao.movie.title,
        dia: sessao.day.date,
        horario: sessao.name,
        assentos: assentosSelecionados,
        comprador: dadosCompra,
      });
      navigate("/sucesso");
    });
  }

  return (
    <Conteudo>
      <h1>Selecione o(s) assento(s)</h1>
      <Assentos>{assentos}</Assentos>
      <Legenda>{legenda}</Legenda>

      <FormularioCompra onSubmit={confirmarCompra}>
        <label htmlFor="nome">Nome do comprador:</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite seu nome ..."
          required
          onChange={(e) =>
            setDadosCompra({ ...dadosCompra, nome: e.target.value })
          }
        />
        <label htmlFor="cpf"> CPF do comprador:</label>
        <input
          type="text"
          id="cpf"
          placeholder="Digite seu CPF ..."
          required
          onChange={(e) =>
            setDadosCompra({ ...dadosCompra, cpf: e.target.value })
          }
        />
        <div>
          <button>Reservar assento(s)</button>
        </div>
      </FormularioCompra>
      <Footer>{footer}</Footer>
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

const Assentos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const Legenda = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

const AssentoLegenda = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #808f9d;
    background-color: ${({ cor }) => cor || "#C3CFD9"};
  }

  p {
    font-size: 13px;
    margin-top: 5px;
  }
`;

const FormularioCompra = styled.form`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
  margin-bottom: 200px;

  * {
    margin: 5px 0;
  }

  input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
  }

  button {
    background-color: #e8833a;
    width: 225px;
    color: white;
    padding: 10px 5px;
    border: 0;
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
