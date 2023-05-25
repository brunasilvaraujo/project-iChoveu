const TOKEN = import.meta.env.VITE_TOKEN;

export const getWeatherByCity = (cityURL) => {
  if (!cityURL.length) return;
  fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`)
    .then((response) => response.json())
    .then(({ current }) => {
      if (current.is_day !== 0) return;
      const { temp_c: tempC, condition: { text, icon } } = current;
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

export const searchCities = (term) => {
  const query = new URLSearchParams();

  query.append('lang', 'pt');
  query.append('key', TOKEN);
  query.append('q', term);

  fetch(`http://api.weatherapi.com/v1/search.json?${query.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) return window.alert('Nenhuma cidade encontrada');
      data.forEach((item) => {
        getWeatherByCity(item.url);
      });
    })
    .catch((error) => {
      return error.message;
    });
};
