//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import HavaDurumu from './components/HavaDurumu';

const App = () => {
  const [weather, setWeather] = useState('');
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lot) => {
    const key = process.env.REACT_APP_WEATHER_API;
    const lang = navigator.language.split('-')[0];
    console.log(`lang`, { lang });

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=${key}&lang=${lang}&units=metric`
      );
      setWeather(data);
    } catch {
      alert('Veri alırken hata oluştu...');
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div>
      <h1>Hava durumu</h1>
      <HavaDurumu weather={weather} />
    </div>
  );
};

export default App;
