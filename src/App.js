import Youtube from "./components/Youtube";
import Cooking from "./components/Cooking";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gaming from "./components/Gaming";
import BackToTopButton from "./components/ui/BackToTop";
import CopyRight from "./components/CopyRight";
import Navbar from "./components/ui/navbar";
import NotFound from "./components/ui/Notfound";
import Music from "./components/Music";
import Programming from "./components/Programming";
import Tranding from "./components/Tranding";
function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Youtube />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/music" element={<Music />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/tranding" element={<Tranding />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <BackToTopButton />
        <CopyRight />
      </>
    </BrowserRouter>
  );
}

export default App;
