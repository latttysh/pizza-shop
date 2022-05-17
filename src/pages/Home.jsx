import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Sekeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://627f909abe1ccb0a4661beb7.mockapi.io/pizzas?${
          categoryId > 0 ? `category=${categoryId}` : ``
        }&sortBy=${sort.sortProperty}&order=desc`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sort]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                title={obj.title}
                price={obj.price}
                img={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
                id={obj.id}
                key={obj.id}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
