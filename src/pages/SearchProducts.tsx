import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListBackground from '../components/layout/productsList/ListBackground';
import SearchProductsList from '../components/layout/productsList/SearchProductsList';

const SearchProducts = () => {
  const queryLocation = useLocation();
  const [searchPrams] = useSearchParams();
  const [productData, setProductData] = useState({
    keyword: '',
    count: '',
    location: '',
  });
  // const keyword = searchPrams.get('keyword') || '';
  // const count = searchPrams.get('count') || '';
  // const location = searchPrams.get('location') || '';

  useEffect(() => {
    setProductData({
      keyword: searchPrams.get('keyword') || '',
      count: searchPrams.get('count') || '',
      location: searchPrams.get('location') || '',
    });

    console.log(productData.location);
  }, [queryLocation.key]);

  return (
    <div>
      <ListBackground />
      {productData.keyword && (
        <SearchProductsList
          keyword={productData.keyword}
          count={productData.count}
          location={productData.location}
        />
      )}
    </div>
  );
};

export default SearchProducts;
