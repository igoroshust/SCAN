import './styles/styles.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
        <div className="footer__sticky">
            <Header />
        </div>
            <Footer />
    </div>
  );
}

export default App;
