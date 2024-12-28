import './styles/styles.css';
import './scripts/customscript.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import MeetUs from './components/Main/MeetUs/MeetUs';
import Search from './components/Search/Search';


function App() {
  return (
    <div className="App">
        <Header />
        <Search />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
