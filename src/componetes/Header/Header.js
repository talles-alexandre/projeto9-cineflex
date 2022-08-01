import styled from "styled-components";

export default function Header() {
  return (
    <Titulo>
      <h1>Cineflex</h1>
    </Titulo>
  );
}
const Titulo = styled.div`
  background-color: #c3cfd9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 34px;
    text-transform: uppercase;
    color: #e8833a;
  }
`;
