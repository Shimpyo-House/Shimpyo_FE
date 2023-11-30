import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListBackground from '../components/layout/productsList/ListBackground';
import SearchProductsList from '../components/layout/productsList/SearchProductsList';

const SearchProducts = () => {
  const [searchPrams] = useSearchParams();
  const [keyword, setKeword] = useState('');
  const [count, setCount] = useState('');
  const [location, setLocation] = useState('');
  useEffect(() => {
    const isKeyWord = searchPrams.get('keyword');
    const isCount = searchPrams.get('count');
    const isLocation = searchPrams.get('location');

    if (isKeyWord && isCount && isLocation) {
      setKeword(isKeyWord);
      setCount(isCount);
      setLocation(isLocation);
    }
  }, []);

  return (
    <div>
      <ListBackground />
      {keyword !== '' && (
        <SearchProductsList
          keyword={keyword}
          count={count}
          location={location}
        />
      )}
    </div>
  );
};

export default SearchProducts;
