import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Tela1 from "./Tela1";
import Tela2 from "./Tela2";
import Tela3 from "./Tela3";
import Tela4 from "./Tela4";

export default function App() {
  const [reserva, setReserva] = useState(null);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Tela1 />} />
        <Route path="/sessoes/:idFilme" element={<Tela2 />} />
        <Route
          path="/assentos/:idSessao"
          element={<Tela3 finalizar={(reserva) => setReserva(reserva)} />}
        />
        <Route path="/sucesso" element={<Tela4 reserva={reserva} />} />
      </Routes>
    </BrowserRouter>
  );
}
