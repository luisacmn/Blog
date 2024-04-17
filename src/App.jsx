import './App.css';
import {HomePage} from './pages/HomePage';
import {ArticleListPage} from './pages/ArticleListPage';
import {AboutPage} from './pages/AboutPage';
import {NotFoundPage} from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <HomePage />
      <ArticleListPage />
      <AboutPage />
      <NotFoundPage />
    </div>
  );
}

export default App; 