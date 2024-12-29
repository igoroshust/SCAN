import './styles/styles.css';
import './scripts/customscript.js';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Search from './components/Search/Search';
import Auth from './components/Auth/Auth';


function App() {
  return (
    <div className="App">
        <Header />
        <Search />
        <Auth />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
