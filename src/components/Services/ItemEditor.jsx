import React from 'react';

function ItemEditor({ item, onChange, onDelete }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...item, [name]: value });
  };

  const confirmDelete = () => {
    if (window.confirm(`Вы действительно хотите удалить "${item.name || 'новую услугу'}"? Это действие безвозвратно!`)) {
      onDelete();
    }
  };

  const inputClassName =
    'p-2 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div className="w-full flex flex-col items-center justify-between dark:bg-black rounded-10 px-0 mt-5 rounded-md shadow-xl">
      <div className="flex w-full justify-between items-start flex-row mb-2">
        <div className="flex flex-col w-full h-full justify-around px-1">
        <div className="w-full flex flex-row justify-between items-center pr-2 mb-2">
          <span className="text-gray-500">Услуга:</span>
          <input
            type="text"
            name="name"
            value={item.name || ''}
            onChange={handleChange}
            placeholder="Название"
            className={inputClassName}
          />
        </div>
          <div className="w-full flex flex-row justify-between items-center pr-2 mb-2">
            <span className="text-gray-500">Стоимость:</span>
            <div>
              <input
                type="number"
                name="price"
                value={item.price || ''}
                onChange={handleChange}
                placeholder="Цена"
                className={`${inputClassName} w-14`}
                inputMode="numeric"
              />
              <span className="text-gray-500"> ₽</span>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center pr-2">
            <span className="text-gray-500">Длительность:</span>
            <div>
              <input
                type="number"
                name="duration"
                value={item.duration || ''}
                onChange={handleChange}
                placeholder="Длительность"
                className={`${inputClassName} w-14`}
                inputMode="numeric"
              />
              <span className="text-gray-500"> мин.</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={confirmDelete}
        className="rounded-md py-2 mt-1 w-full text-white bg-DimGray">
        Удалить {item.name && item.name.length > 0 ? `"${item.name}"` : ''}
      </button>
    </div>
  );
}

export default ItemEditor;