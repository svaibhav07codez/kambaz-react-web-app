import store from "./Kambaz/store";
import { Provider } from "react-redux";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
