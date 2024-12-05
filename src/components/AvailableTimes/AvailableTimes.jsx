import { BackButton, MainButton } from '@twa-dev/sdk/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import WebApp from '@twa-dev/sdk';
import { IconTrash } from '@tabler/icons-react';
import Loader from '../../common/Loader/Loader';
import '../../index.css'

function AvailableTimes() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('page-el-enter');

  useEffect(() => {
    setAnimationClass('page-el-enter-active');
    axios
      .get(`${process.env.REACT_APP_URL}/availableTimes.json?t=${Date.now()}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTimeChange = (e, index) => {
    const { value } = e.target;
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], time: value };
      return newData;
    });
  };

  const handleNavigation = () => {
    setAnimationClass('page-el-exit-active');

    setTimeout(() => {
      navigate('/admin-shd');
    }, 300);
  };
  
  const addTime = () => {
    setData([...data, '']);
  };

  const deleteTime = (index) => {
    const updatedTimes = data.filter((_, i) => i !== index);
    setData(updatedTimes);
  };

  const saveData = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/availableTimes.json`, data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) {
    return <Loader />
  }

  const inputClassName = 'pl-2 py-2 w-1/5 m-2 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';
  
  return (
    <div className={`w-full h-full flex flex-col justify-center items-center pt-4 page-el ${animationClass}`}>
      
      <div className='w-full flex flex-col px-3'>
        <span className='font-bold dark:text-white'>Время для записи:</span>
        <div className='flex flex-col w-full'>
          {
            data.map((i, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-300 dark:border-dark-switch">
              <input
                type="number"
                value={i.time || ''}
                onChange={(e) => handleTimeChange(e, index)}
                name="availableTimes"
                className={inputClassName}
                inputMode="numeric"
              />
              <IconTrash stroke={2} color='#FF0000' onClick={() => deleteTime(index)} />
              </div>
            ))
          }
        </div>
      </div>
      <button onClick={addTime} className="mt-6 px-4 py-2 text-white font-semibold bg-orange-600 rounded-md">Добавить время</button>
      <BackButton onClick={handleNavigation} />
      <MainButton text='Сохранить изменения' onClick={saveData} />
      <button onClick={saveData}>Сохранить</button>
    </div>
  );
  
}

export default AvailableTimes;
