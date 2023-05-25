const TOKEN = import.meta.env.VITE_TOKEN;

export const searchCities = (term) => {
  const query = new URLSearchParams();

  query.append('lang', 'pt');
  query.append('key', TOKEN);
  query.append('q', term);

  fetch(`http://api.weatherapi.com/v1/search.json?${query.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) return window.alert('Nenhuma cidade encontrada');
    })
    .catch((error) => {
      return error.message;
    });
};

export const getWeatherByCity = () => {

};
