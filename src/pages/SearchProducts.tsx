import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ListBackground from '../components/layout/productsList/ListBackground';
import SearchProductsList from '../components/layout/productsList/SearchProductsList';

const SearchProducts = () => {
  const queryLocation = useLocation();
  const [searchPrams] = useSearchParams();
  const keyword = searchPrams.get('keyword') || '';
  const count = searchPrams.get('count') || '';
  const location = searchPrams.get('location') || '';

  useEffect(() => {}, [queryLocation.key]);

  return (
    <div>
      <ListBackground />
      {keyword && (
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
