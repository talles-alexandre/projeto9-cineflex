import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Tela4(props) {
  const navigate = useNavigate();

  const { reserva } = props;
  const { filme, dia, horario, assentos, comprador } = reserva;
  const numerosAssentos = [...assentos.values()];

  return (
    <Conteudo>
      <h1>Pedido feito com sucesso!</h1>
      <Infos>
        <h1>Filme e sessão</h1>
        <p>{filme}</p>
        <p>
          {dia} {horario}
        </p>
      </Infos>
      <Infos>
        <h1>Ingressos</h1>
        {numerosAssentos.map((numero) => (
          <p key={numero}>Assento {numero}</p>
        ))}
      </Infos>
      <Infos>
        <h1>Comprador</h1>
        <p>Nome: {comprador.nome}</p>
        <p>CPF: {comprador.cpf}</p>
      </Infos>

      <button onClick={() => navigate("/")}>Voltar para home</button>
    </Conteudo>
  );
}

const Conteudo = styled.div`
  margin: 70px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;

  h1 {
    height: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #247a6b;
    font-weight: 700;
  }
  button {
    background-color: #e8833a;
    width: 225px;
    color: white;
    padding: 10px 5px;
    border: 0;
    margin-top: 60px;
    cursor: pointer;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
  }
  p {
    line-height: 25px;
  }
`;
