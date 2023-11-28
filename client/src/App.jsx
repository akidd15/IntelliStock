import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Categories from './components/categories';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />}>
          <Route path=":index" element={<CategoryDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

const CategoryDetail = ({ params, categories }) => {
  const index = params.index;
  const category = categories[index];

  return <Categories category={category} />;
};


export default App;
