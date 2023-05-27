const TOKEN = import.meta.env.VITE_TOKEN;

export const getWeatherByCity = (cityURL) => {
  if (!cityURL.length) return;
  return fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`)
    .then((response) => response.json())
    .then((city) => {
      const {
        temp_c: tempC,
        condition: { text, icon },
      } = city.current;
      const tempCurrent = {
        temp: tempC,
        condition: text,
        icon,
      };
      return tempCurrent;
    })
    .catch((error) => {
      return error.message;
    });
};

export const searchCities = async (term) => {
  const query = new URLSearchParams();

  query.append('lang', 'pt');
  query.append('key', TOKEN);
  query.append('q', term);

  return fetch(`http://api.weatherapi.com/v1/search.json?${query.toString()}`)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data.length) {
        window.alert('Nenhuma cidade encontrada');
        return [];
      }
      return data;
    })
    .catch((error) => {
      return error.message;
    });
};

const DAY = 7;

export const btnModal = async (urlCidade) => {
  return fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${TOKEN}&q=${urlCidade}&days=${DAY}`)
    .then((response) => response.json())
    .then((data) => {
      const arrForecast = data.forecast.forecastday;
      return arrForecast.map((objForecast) => {
        const obj = {
          date: objForecast.date,
          maxTemp: objForecast.day.maxtemp_c,
          minTemp: objForecast.day.mintemp_c,
          condition: objForecast.day.condition.text,
          icon: objForecast.day.condition.icon,
        };
        return obj;
      });
    })
    .catch((error) => {
      return error.message;
    });
};
