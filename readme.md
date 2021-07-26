<h1 align="center">
  <a href="#">
    DaysAway
  </a>
</h1>
<div align="center"> <i>For when you just feel like going <del>somewhere</del> anywhere</i></div>

## 📋 Table of contents

* [Overview](#-overview)

* [Images](#-images)

* [Video](#video)

* [Technologies](#-technologies)

* [Setup](#-setup)

* [About](#-about)

  

## 🔭 Overview

Welcome to DaysAway, a new native mobile application to help you select a day out using public transport. Simply choose your preferred departing station from a list based on your location, your maximum travel time and the algorithm will take care of the rest for you. 

**Current features include:**

- Real-time user location data via Expo's location package is fed into TransportAPI to return a list of local train stations, sorted by distance from the current location.
- Days out are displayed on a swipeable card deck, allowing the user to either swipe right/ tap the '+' button to add the trip to their saved journeys or swipe left to discard.
- Tapping on a journey card reveals the details screen:
  - Activities - a list of ten local points of interest from OpenTripMap API based on the destination location, includes a user rating, distance from the station and a navigation button that links to the users default mapping application. 
  - Journey Details - live journey information which updates in real-time, includes:
    - Scheduled/ expected departure & arrival time.
    - Train changes, platform number and stations calling en route.
    - Live specific train status and time now, departing station distance from user and journey time.
  - Weather - data requested from WeatherAPI displays the conditions at the destination. 
- Links to open the National Rail website to book tickets for the selected day out.

**Future updates:**

  - Return journey options
  - Algorithm optimisation
  - Customisable user preferences when searching for days out, eg beach, city, countryside. 

- Back end implementation


## 📸 Images
<div align="center">
<img src="https://github.com/TheNoshman/DaysAway/blob/main/assets/app-photos/firstthree.png?raw=true" height="550" />
<img src="https://github.com/TheNoshman/DaysAway/blob/main/assets/app-photos/secondthree.png?raw=true" height="550" />
</div>


## 📽️ Video
[![DaysAway-thumbnail](https://github.com/TheNoshman/DaysAway/blob/main/assets/app-photos/vid-thumb.png)](https://youtu.be/mUuUEtV6Nt8)

## 🤖 Technologies

<div align="center">
   <table>
  <tr>
    <th style="text-align:center, width:400px">React Native</th>
    <th style="text-align:center">Expo</th>
    <th style="text-align:center">Redux</th>
    <th style="text-align:center">Day.js</th>
    <th style="text-align:center">TransportAPI</th>
    <th style="text-align:center">OpenTripMap API</th>
    <th style="text-align:center">Unsplash API</th>
    <th style="text-align:center">weatherAPI</th>
  </tr>
  <tr>
    <td style="text-align:center"><img src="https://img.icons8.com/nolan/64/react-native.png" style="align-items:center"/> </td>
    <td style="text-align:center"><img src="https://img.icons8.com/ios-glyphs/50/000000/chevron-up.png"/></td>
    <td style="text-align:center"><img src="https://img.icons8.com/color/48/000000/redux.png"/></td>
    <td style="text-align:center"><img src="https://user-images.githubusercontent.com/17680888/39081119-3057bbe2-456e-11e8-862c-646133ad4b43.png"  width="100"></td>
     <td style="text-align:center"><img src="https://img.icons8.com/fluent/48/000000/up.png" width="50" > </td>
    <td style="text-align:center"><img src="https://opentripmap.io/img/small_logo.svg" alt="aws-s3" width="50"></td>
    <td style="text-align:center"><img src="https://unsplash-assets.imgix.net/marketing/press-symbol.svg?auto=format&fit=crop&q=60" alt="aws-s3" width="50"></td>
    <td style="text-align:center"><img src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png" alt="aws-s3" height="50" ></td>
  </tr>
</table> 
</div>

## 🛠️ Setup

0. Setup prerequisites:
   * `React Native`
   * `Expo`
   * `Node.js`

1. To run DaysAway, clone and install it locally using npm:

```
$ git clone https://github.com/TheNoshman/DaysAway.git
```

2. Next, navigate into the `DaysAway` directory and install dependancies:

```
$ npm install
```

3. Inside the `DaysAway` directory, configure the [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa). See `example-env.txt` for reference:
4. Finally, start the application:

   * Navigate into `DaysAway` and run `expo start`

     

## 📖 About

* [DaysAway on LinkedIn](https://www.linkedin.com/company/daysawayapp)
