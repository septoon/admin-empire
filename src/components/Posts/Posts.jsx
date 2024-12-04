import { BackButton, MainButton } from '@twa-dev/sdk/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader/Loader';
import { IconTrash, IconTrashFilled } from '@tabler/icons-react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({ isNotAvailable: false, content: '' });
  const [loading, setLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('page-el-enter');

  useEffect(() => {
    setAnimationClass('page-el-enter-active');
    axios
      .get(`${process.env.REACT_APP_URL}/posts.json?t=${Date.now()}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePostChange = (e, index) => {
    const { name, value } = e.target;
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index] = {
        ...updatedPosts[index],
        [name]: value,
      };
      return updatedPosts;
    });
  };

  const handleContentChange = (e, postIndex, contentIndex) => {
    const { value } = e.target;
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      const updatedContent = [...updatedPosts[postIndex].content];
      updatedContent[contentIndex] = value;
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        content: updatedContent,
      };
      return updatedPosts;
    });
  };

  const addPost = () => {
    const newPost = {
      id: Date.now(), // Уникальный идентификатор
      title: '',
      content: [''], // Начальное содержимое
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const deletePost = (index) => {
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
  };

  const addContentLine = (postIndex) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[postIndex].content.push('');
      return updatedPosts;
    });
  };

  const deleteContentLine = (postIndex, contentIndex) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[postIndex].content = updatedPosts[postIndex].content.filter(
        (_, i) => i !== contentIndex
      );
      return updatedPosts;
    });
  };

  const saveData = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/posts.json`, data)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center pt-4 page-el ${animationClass}`}>
      <div className="w-full flex flex-col px-3">
        
          {
            posts.map((items, index) => (
              <div key={index} className='border border-gray-300 dark:border-dark-switch rounded-lg p-2 mb-4'>
                <div className="w-full flex flex-row justify-between items-center px-2 py-4 border-b border-gray-300 dark:border-dark-switch mb-2">
                  <input type="text" value={items.title} onChange={handlePostChange} className='p-2' />
                  <IconTrash stroke={2} color='#FF0000' 
                  onClick={() => deletePost(index)} 
                  />
                </div>
                <div className='flex flex-col'>
                {
                  items.content.map((item, contentIndex) => (
                    <div className='flex justify-between items-center mb-2 px-2'>
                      <textarea key={contentIndex} className='w-3/4' value={item} onChange={handleContentChange} />
                      <IconTrashFilled stroke={2} size={16} color='#FF0000' onClick={() => deleteContentLine(index, contentIndex)} />
                    </div>
                  ))
                }
                <button
                  onClick={addContentLine}
                  className="mt-2 px-1 py-2 w-1/2 text-white text-sm font-semibold bg-orange rounded-md"
                >
                  Добавить строку +
                </button>
                </div>
              </div>
            ))
          }
        <button
            onClick={addPost}
            className="mt-2 px-4 py-2 w-2/3 text-white font-semibold bg-orange-600 rounded-md"
          >
            Добавить новый пост +
          </button>
      </div>

      {/* <BackButton onClick={handleNavigation} /> */}
      <MainButton text="Сохранить изменения" onClick={saveData} />
    </div>
  );
};

export default Posts;