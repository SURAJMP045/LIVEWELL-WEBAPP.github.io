import React, { useEffect, useState } from 'react';
import './Greeting.css';
import PropTypes from 'prop-types';

const WEATHER_API_KEY = '9aef68d455204f9699f170200251408'; 

function RainEffect() {
  return (
    <div className="rain-effect">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="raindrop" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }} />
      ))}
    </div>
  );
}
function SnowEffect() {
  return (
    <div className="snow-effect">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="snowflake" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}>*</div>
      ))}
    </div>
  );
}
function ThunderEffect() {
  return (
    <div className="thunder-effect">
      <div className="lightning" />
    </div>
  );
}
function SunnyEffect() {
  return (
    <div className="sunny-effect">
      <div className="sun-glow" />
    </div>
  );
}
function CloudEffect() {
  return (
    <div className="cloud-effect">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`cloud cloud${i+1}`} />
      ))}
    </div>
  );
}
function FogEffect() {
  return <div className="fog-effect" />;
}

const Greeting = ({ user }) => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [spoken, setSpoken] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => setError('Location access denied.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location.lat},${location.lon}`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch(() => setError('Failed to fetch weather.'));
    }
  }, [location]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let base = 'Good Morning';
    if (hour < 12) base = 'Good Morning';
    else if (hour < 18) base = 'Good Afternoon';
    else base = 'Good Evening';
    return user && user.name ? `${base}, ${user.name}` : base;
  };

  const speakGreeting = () => {
    if (!weather || !weather.location || !weather.current) return;
    const greeting = getGreeting();
    const city = weather.location.name;
    const temp = weather.current.temp_c;
    const cond = weather.current.condition.text;
    let text = `${greeting} in ${city}. It's ${temp} degrees Celsius and ${cond.toLowerCase()}.`;
    if (weather.current.humidity > 70) {
      text += ' Humid day. Remember to hydrate!';
    }
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = 'en-US';
      window.speechSynthesis.cancel(); 
      window.speechSynthesis.speak(utter);
    }
  };

  useEffect(() => {
    if (weather && !spoken && !error) {
      speakGreeting();
      setSpoken(true);
    }
  }, [weather, error]);

  const handleReplay = () => {
    speakGreeting();
  };

  let effect = null;
  let effectClass = '';
  if (weather && weather.current) {
    const cond = weather.current.condition.text.toLowerCase();
    if (cond.includes('rain')) {
      effect = <RainEffect />;
      effectClass = 'raining';
    } else if (cond.includes('snow') || cond.includes('sleet') || cond.includes('blizzard')) {
      effect = <SnowEffect />;
      effectClass = 'snowing';
    } else if (cond.includes('thunder')) {
      effect = <ThunderEffect />;
      effectClass = 'thunder';
    } else if (cond.includes('clear') || cond.includes('sunny')) {
      effect = <SunnyEffect />;
      effectClass = 'sunny';
    } else if (cond.includes('cloud')) {
      effect = <CloudEffect />;
      effectClass = 'cloudy';
    } else if (cond.includes('fog') || cond.includes('mist') || cond.includes('haze')) {
      effect = <FogEffect />;
      effectClass = 'foggy';
    }
  }

  return (
    <section className={`dashboard-card greeting-card${effectClass ? ' ' + effectClass : ''}`}>
      {effect}
      <div className="card-icon greeting">🌞</div>
      {error && <p className="greeting-error">{error}</p>}
      {!error && !weather && <p className="greeting-loading">Loading...</p>}
      {weather && (
        <>
          <h2 className="card-title greeting">
            {getGreeting()} in {weather.location.name} {weather.current.is_day ? '☀️' : '🌙'}
            <button
              aria-label="Replay voice greeting"
              className="greeting-voice-btn"
              style={{marginLeft: 12, fontSize: '1.2rem', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer'}}
              onClick={handleReplay}
              title="Replay voice greeting"
            >🔊</button>
          </h2>
          <div className="greeting-weather-row">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="greeting-weather-icon"
            />
            <div className="greeting-weather-info">
              <p>
                {weather.current.temp_c}°C, {weather.current.condition.text}
              </p>
              <p className="greeting-weather-meta">
                Humidity: {weather.current.humidity}% | Wind: {weather.current.wind_kph} kph
              </p>
              {weather.current.humidity > 70 && (
                <p className="greeting-hydrate">Humid day — hydrate more!</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

Greeting.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Greeting;