import React from 'react';

const categories = ['Todos', 'Alimentos', 'Juguetes', 'Higiene', 'Accesorios'];

const FilterSidebar = ({ onSelectCategory, selectedCategory }) => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left text-lg font-medium hover:text-orange transition-colors duration-200 ${
                selectedCategory === category ? 'text-gray-500' : 'text-white'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FilterSidebar;