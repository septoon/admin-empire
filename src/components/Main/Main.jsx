import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

import servicesIcon from '../../assets/img/services.png';
import contactsIcon from '../../assets/img/contacts.png';
import clockIcon from '../../assets/img/clock.png';
import postsIcon from '../../assets/img/posts.png';
import availableIcon from '../../assets/img/isAvailable.png';
import { chatIds } from '../../common/access';

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!WebApp) {
        console.error('Telegram WebApp API недоступен.');
        return;
      }
      WebApp.ready();
      WebApp.expand();
      setTimeout(() => {
        WebApp.requestFullscreen()
          .catch((error) => {
            console.error('Ошибка при попытке перейти в полноэкранный режим:', error);
          });
      }, 300);
    } catch (error) {
      console.error('Ошибка при инициализации Telegram WebApp:', error);
    }
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-20 overflow-hidden'>
      {
      chatIds.includes(WebApp.initDataUnsafe.user.id) ? (
        <>
        <div
          className="w-[80%] h-15 flex justify-start pl-5 items-center mb-15 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={WebApp.initDataUnsafe.user.photo_url} className="h-6 rounded-full mr-3" alt="avatar" />
          <div className='flex flex-col'>
            <span className="dark:text-white font-semibold">{`${ WebApp.initDataUnsafe.user.first_name}`}</span>
            <span className="dark:text-white text-sm opacity-50">{WebApp.initDataUnsafe.user.user.id === process.env.REACT_APP_ADMIN_ID ? 'Администратор' : 'Модератор'}</span>
          </div>
        </div>
        <div
          onClick={() => navigate('/services')}
          className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={servicesIcon} className="h-5 mr-3" alt="services" />
          <span className="dark:text-white">Услуги</span>
        </div>
        <div
          onClick={() => navigate('/contacts')}
          className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={contactsIcon} className="h-5 mr-3" alt="contacts" />
          <span className="dark:text-white">Контакты</span>
        </div>
        <div
          onClick={() => navigate('/available-times')}
          className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={clockIcon} className="h-5 mr-3" alt="available-times" />
          <span className="dark:text-white">Время для записи</span>
        </div>
        <div
          onClick={() => navigate('/posts')}
          className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={postsIcon} className="h-5 mr-3" alt="posts" />
          <span className="dark:text-white">Посты</span>
        </div>
        <div
          onClick={() => navigate('/available')}
          className="w-[80%] h-20 flex justify-start pl-5 items-center mb-5 bg-silver dark:bg-darkGray rounded-lg cursor-pointer"
        >
          <img src={availableIcon} className="h-5 mr-3" alt="available" />
          <span className="dark:text-white">Доступность сайта</span>
        </div>
        </>
      ) : (
        <span>К сожалению, у вас нет доступа</span>
      )}
    </div>
  );
};

export default Main;