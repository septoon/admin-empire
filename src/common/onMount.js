import axios from "axios";
import { toast } from "react-toastify";

export const onMount = (dataName, setMenuItems, setLoading) => {
  axios
      .get(`https://api.shashlichny-dom.ru/${dataName}.json?t=${Date.now()}`)
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => {
        setLoading(false);
      });

    // Показать кнопку "Назад"
    window.Telegram?.WebApp.BackButton.show();
    window.Telegram?.WebApp.BackButton.onClick(() => window.history.back());

    // Настроить основную кнопку
    window.Telegram?.WebApp.MainButton.setText('Сохранить изменения');
    window.Telegram?.WebApp.MainButton.show();
    
    return () => {
      // Скрыть кнопки при размонтировании компонента
      window.Telegram?.WebApp.BackButton.hide();
      window.Telegram?.WebApp.MainButton.hide();
    };
}