import { BackButton, MainButton } from '@twa-dev/sdk/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader/Loader';
import Switch from '../Switch/Switch';

const Available = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ isNotAvailable: false, content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/available.json?t=${Date.now()}`)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === 'checkbox' && window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveData = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/available.json`, data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  const inputWrapper =
    'flex items-center py-3 w-full border-b border-gray-300 dark:border-dark-switch';
  const inputClassName =
    'pl-2 py-0 w-full h-auto border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';
  const visibleAvailable = data.isNotAvailable ? 'flex items-center my-3 w-full opacity-1' : 'flex items-center my-3 w-full opacity-35'
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className='w-full h-full flex flex-col justify-center items-center pt-4'>
      <div className="w-full flex flex-col px-3">
        <div className={inputWrapper}>
          <div className="flex justify-between items-center w-full">
            <span className="font-bold dark:text-white">Сайт недоступен:</span>
            <Switch
              name='available'
              value={data.isNotAvailable}
              onColor="#4DD863"
              handleToggle={(e) =>
                handleChange({
                  target: {
                    name: 'isNotAvailable',
                    type: 'checkbox',
                    checked: !data.isNotAvailable,
                  },
                })
              }
            />
          </div>
        </div>

        <div className={visibleAvailable}>
          <div className="flex flex-col w-full">
            <span className="font-bold dark:text-white mb-2">Почему сайт недоступен:</span>
            <textarea
              name="content"
              className={inputClassName}
              disabled={!data.isNotAvailable}
              placeholder="Введите причину недоступности сайта"
              onChange={handleChange}
              value={data.content || ''}
              rows="3"
            />
          </div>
        </div>
      </div>

      <BackButton onClick={() => navigate('/admin-empire')} />
      <MainButton text="Сохранить изменения" onClick={saveData} />
    </div>
  );
};

export default Available;
