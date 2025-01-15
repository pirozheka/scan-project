import './App.css';
import Header from './components/header/Header';
import Cover from './components/cover/Cover';
import Options from './components/options/Options';
import Pricing from './components/pricing/Pricing';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Cover />
      <Options />
      <Pricing />
      <Footer />
    </div>
  );
}

export default App;
