import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CategoryProductsList from '../components/layout/productsList/CategoryProductsList';

const CategoryProducts = () => {
  const [searchPrams] = useSearchParams();
  const [category, setCategory] = useState('');
  useEffect(() => {
    const isString = searchPrams.get('type');
    if (isString) {
      setCategory(isString);
    }
  }, []);

  return (
    <div>{category !== '' && <CategoryProductsList category={category} />}</div>
  );
};

export default CategoryProducts;
