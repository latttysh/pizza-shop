import { useState } from 'react';

function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Вегетарианская', 'Гриль', 'Мясные', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((catName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {catName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
