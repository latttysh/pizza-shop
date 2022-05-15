import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import Skeleton from '../components/PizzaBlock/Sekeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [sort, setSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

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
        console.log(sort);
      });
    console.log(sort);
  }, [categoryId, sort]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sort} onClickSort={(id) => setSort(id)} />
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
                key={obj.id}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
