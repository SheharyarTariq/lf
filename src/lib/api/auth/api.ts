import axios from 'axios';

const api = axios.create({

    baseURL:'https://laundry-free-2a18b6e8d093.herokuapp.com/api',

});

export default api;
