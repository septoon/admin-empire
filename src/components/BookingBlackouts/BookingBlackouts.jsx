import { BackButton, MainButton } from '@twa-dev/sdk/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconTrash } from '@tabler/icons-react';
import Loader from '../../common/Loader/Loader';

const JSON_PATH = 'bookingBlackouts.json';

function normalizeDateStr(dateStr) {
  // Expect YYYY-MM-DD (native <input type="date"> format).
  if (typeof dateStr !== 'string') return null;
  const trimmed = dateStr.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  return trimmed;
}

function formatRu(dateStr) {
  const normalized = normalizeDateStr(dateStr);
  if (!normalized) return dateStr;
  // Parse as local date to avoid timezone shifting.
  const d = new Date(`${normalized}T00:00:00`);
  return d.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: '2-digit' });
}

function BookingBlackouts() {
  const navigate = useNavigate();

  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [loading, setLoading] = useState(true);

  const sortedUniqueDates = useMemo(() => {
    const uniq = Array.from(
      new Set(
        (Array.isArray(dates) ? dates : [])
          .map(normalizeDateStr)
          .filter(Boolean)
      )
    );
    uniq.sort(); // YYYY-MM-DD sorts lexicographically correctly
    return uniq;
  }, [dates]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/${JSON_PATH}?t=${Date.now()}`)
      .then((response) => {
        // Support both array and { dates: [...] } in case format evolves.
        const payload = response.data;
        if (Array.isArray(payload)) return setDates(payload);
        if (payload && Array.isArray(payload.dates)) return setDates(payload.dates);
        setDates([]);
      })
      .catch((error) => {
        // If file doesn't exist yet, treat as empty list.
        if (error?.response?.status === 404) {
          setDates([]);
          return;
        }
        console.error('Error fetching data:', error);
        toast.error('Ошибка загрузки данных.');
      })
      .finally(() => setLoading(false));
  }, []);

  const addDate = () => {
    const normalized = normalizeDateStr(newDate);
    if (!normalized) return toast.error('Выберите дату.');
    setDates((prev) => {
      const next = Array.isArray(prev) ? [...prev] : [];
      if (next.includes(normalized)) return next;
      return [...next, normalized];
    });
    setNewDate('');
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('soft');
  };

  const deleteDate = (dateStr) => {
    setDates((prev) => (Array.isArray(prev) ? prev.filter((d) => d !== dateStr) : []));
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium');
  };

  const saveData = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('heavy');
    axios
      .put(`${process.env.REACT_APP_URL}/api/save/${JSON_PATH}`, sortedUniqueDates)
      .then(() => toast.success('Данные успешно обновлены!'))
      .catch((error) => {
        console.error('Error saving data:', error);
        toast.error('Ошибка обновления данных.');
      });
  };

  if (loading) return <Loader />;

  const inputClassName =
    'p-2 border border-gray-300 focus:outline-none dark:border-dark-switch dark:bg-dark dark:text-white rounded';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-4">
      <div className="w-full flex flex-col px-3">
        <span className="font-bold dark:text-white">Запрет на бронирование по датам:</span>
        <span className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Эти даты будут недоступны для выбора на клиенте. Сервер тоже должен отклонять бронь на эти дни.
        </span>

        <div className="flex items-end gap-2 mt-4 pb-4 border-b border-gray-300 dark:border-dark-switch">
          <div className="flex flex-col w-full">
            <span className="text-sm font-bold dark:text-white mb-1">Добавить дату</span>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className={inputClassName}
            />
          </div>
          <button
            type="button"
            onClick={addDate}
            className="h-10 px-4 text-white font-semibold bg-orange-600 rounded-md"
          >
            Добавить
          </button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold dark:text-white">Список ({sortedUniqueDates.length})</span>
          </div>
          <div className="flex flex-col w-full mt-2">
            {sortedUniqueDates.length === 0 ? (
              <span className="text-sm text-gray-500 dark:text-gray-300">Пока нет запрещенных дат.</span>
            ) : (
              sortedUniqueDates.map((d) => (
                <div
                  key={d}
                  className="flex justify-between items-center py-3 border-b border-gray-300 dark:border-dark-switch"
                >
                  <span className="dark:text-white">{formatRu(d)}</span>
                  <IconTrash stroke={2} color="#FF0000" onClick={() => deleteDate(d)} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BackButton onClick={() => navigate('/admin-empire')} />
      <MainButton text="Сохранить изменения" onClick={saveData} />
    </div>
  );
}

export default BookingBlackouts;

