import React, { useState, useEffect } from 'react';
import ItemEditor from './ItemEditor';
import { Accordion, AccordionTab } from 'primereact/accordion';
import '../../custom.css';

function CategoryEditor({ category, items, categoryIndex, onUpdate }) {
  const [editingItems, setEditingItems] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([0, 1]);
  const [editingCategory, setEditingCategory] = useState(category);

  useEffect(() => {
    setEditingItems(items);
    setEditingCategory(category)
  }, [items, category]);

  const handleChange = (index, updatedItem) => {
    const newItems = editingItems.map((item, i) => (i === index ? updatedItem : item));
    setEditingItems(newItems);
    onUpdate({ category: editingCategory, items: newItems });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setEditingCategory(newCategory);
    onUpdate({ category: newCategory, items: editingItems });
  };

  const addItem = () => {
    const newItem = { id: `${category}-${Date.now()}`, category, name: '', price: '', duration: '' };
    const newItems = [...editingItems, newItem];
    setEditingItems(newItems);
    onUpdate(newItems);
  };

  const deleteItem = (id) => {
    const newItems = editingItems.filter((item) => item.id !== id);
    setEditingItems(newItems);
    onUpdate(newItems);
  };

  const onTabChange = (e) => {
    setActiveIndexes(e.index);
  };

  return (
    <div className="card flex w-full justify-center overflow-y-scroll mb-2">
      <Accordion
        activeIndex={activeIndexes}
        className="w-full"
        onTabChange={onTabChange}>
        
        <AccordionTab 
          contentClassName='px-0 w-full m-0 [&_.p-accordion-content]:p-0 [&_.p-accordion-content]:dark:bg-black'
          onClick={() => window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')}
          headerClassName='font-bold dark:text-white [&_.p-accordion-header-link]:pl-2 [&_.p-accordion-header-link]:!bg-silver [&_.p-accordion-header-link]:dark:!bg-dark'
          key={category}
          header={
            <span className=" top-0 left-0 right-0 bottom-0 py-4 rounded-md flex items-center pl-6 gap-2">
                <span className="font-bold white-space-nowrap">{category}</span>
            </span>
        }>
          <div className="w-full flex flex-row justify-between items-center pr-2 py-4 border-b border-gray-300 dark:border-dark-switch">
            <span className="text-gray-500">Категория:</span>
            <input
                type="text"
                name="category"
                value={category || ''}
                onClick={(e) => e.stopPropagation()}
                onChange={handleCategoryChange}
                placeholder="Категория"
                className='p-2 w-36 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded'
              />
          </div>
          {
            editingItems.map((item, index) => (
              <ItemEditor key={item.id || index}
              item={item}
              onChange={(updatedItem) => handleChange(index, updatedItem)}
              onDelete={() => deleteItem(item.id)} />
            ))
          }
          <button
            onClick={addItem}
            className="mt-2 px-4 py-2 text-white font-semibold bg-orange-600 rounded-md"
          >
            Добавить новую услугу +
          </button>
        </AccordionTab>
      </Accordion>
    </div>
  );
}

export default CategoryEditor;