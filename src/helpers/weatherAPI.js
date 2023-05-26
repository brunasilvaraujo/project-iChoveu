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
      if (!data.length) return window.alert('Nenhuma cidade encontrada');
      let arrayData = data.map((item) => getWeatherByCity(item.url));
      arrayData = await Promise.all(arrayData);
      return arrayData;
    })
    .catch((error) => {
      return error.message;
    });
};
