import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryEditor from './CategoryEditor';
import { toast } from 'react-toastify';
import { BackButton, MainButton } from '@twa-dev/sdk/react';
import Loader from '../../common/Loader/Loader';

const Services = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/services.json?t=${Date.now()}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryUpdate = (categoryIndex, updatedData) => {
    setData(prevData =>
      prevData.map((categoryItem, index) =>
        index === categoryIndex
          ? { ...categoryItem, category: updatedData.category, items: updatedData.items }
          : categoryItem
      )
    );
  };

  const saveData = () => {
    WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/services.json`, data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) return <Loader />;

  return (
    <div className='w-full pb-10'>
      {data.map((categoryItem, index) => (
        <CategoryEditor
          key={categoryItem.id || index}
          category={categoryItem.category}
          items={categoryItem.items}
          categoryIndex={index}
          onUpdate={(updatedData) => handleCategoryUpdate(index, updatedData)}
        />
      ))}
      <BackButton onClick={() => navigate('/admin-empire')} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
    </div>
  );
};

export default Services;