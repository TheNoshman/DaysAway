// npm install babel-plugin-inline-dotenv
// console.log('process =', process.env.API_ID);

import { useSelector, useDispatch } from 'react-redux';

// http://transportapi.com/v3/uk/places.json?
getLocalStationsURL = process.env.TRANSPORT_TRAIN_STATION_URL


export const getLocalTrainStations = () => findLocalTrainStations('getallfaults')
// export const getFaultsByReg = (reg) => getRegFaultsRequest(`search/${reg}`)





// // GET REQUEST
const findLocalTrainStations = (url) => {
    // Redux location from store
    const reduxLocationValue = useSelector((state) => state.dataOneProperty);
  // LOCATION DATA FOR FETCH
  min_lat = `min_lat=5${}&`
  min_lon = `min_lon=-${}&`
  max_lat = `max_lat=5${}&`
  max_lon = `max_lon=-${}&`

  return fetch(`${localURL}${url}`)
    .then((result) => (result.status <= 400 ? result : Promise.reject(result)))
    .then((result) => result.json())
    .then((result) => sorter(result))
    .catch((err) => {
      console.log(`${err.message}`)
    })
}
