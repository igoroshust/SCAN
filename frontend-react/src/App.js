import './styles/styles.css';
import './scripts/customscript.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import MeetUs from './components/Main/MeetUs/MeetUs';


function App() {
  return (
    <div className="App">
        <Header />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
