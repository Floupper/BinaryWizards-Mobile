# Mogula App

## Description

This project is the mobile version of Mogula, a quiz application.
It allows users to play quizzes and test their knowledge on various topics, whether alone or with friends.

## Main features

- User can play quizzes as an anonymous user
- User can create an account
- User can log in
- When the user is logged in, he can:
  - Play quizzes
  - See and resume his unfinished games
  - Search through a list of public quizzes, created by other users
  - Play quizzes with friends (scrum and team mode)

## Prerequisites

Before you can run the Mobile project, you need to ensure you have the project API running locally.

For the local API, you need to install the [API project](https://git.unistra.fr/binarywizards/s5-binarywizards-serveur/-/blob/dev/README.md?ref_type=heads).

## Installation

To install the Mobile project, you need to clone the repository.

```
git clone git@git.unistra.fr:binarywizards/s5-binarywizards-mobile.git
```

Then, navigate to the project folder.

```
cd BinaryWizards-MobileApp
```

Then, you need to create a _.env_ file containing the following information:

```
REACT_NATIVE_API_URL=<local_IPV4_address_of_your_computer>
REACT_NATIVE_API_PORT=33012
```

Once the _.env_ file is created and filled out, you can install the dependencies and launch the application with the following commands:

```
npm install
npx expo start
```

## App features

### Anonymous user

When the user is not logged in, he can still play quizzes.

<img src="/readme_assets/readme_anonymous.jpg" width="300" height="648">

<img src="/readme_assets/readme_quickquiz.jpg" width="300" height="648">

### User account

When the user is logged in, he can play quizzes, see his unfinished games, search through a list of public quizzes, and play quizzes with friends.

<img src="/readme_assets/readme_userhome.jpg" width="300" height="648">
<img src="/readme_assets/readme_resumegame.jpg" width="300" height="648">

### Play quizzes

The user can play quizzes, whether he is logged in or not.

<img src="/readme_assets/readme_quickquiz.jpg" width="300" height="648">

### Unfinished games

When the user is logged in, he can see his unfinished games.

<img src="/readme_assets/readme_resumegame.jpg" width="300" height="648">

### Search public quizzes

When the user is logged in, he can search through a list of public quizzes, created by other users.

<img src="/readme_assets/readme_searchquiz.jpg" width="300" height="648">

### Play with friends

When the user is logged in, he can play quizzes with friends. Two modes are available: scrum and team mode.

<img src="/readme_assets/readme_joingame.jpg" width="300" height="648">

<img src="/readme_assets/readme_endscreenteam.jpg" width="300" height="648">

## Technologies used

- React Native
- Expo

## Authors

- SCHLEGEL Louis : Project Manager, Web Developer
- SCHAEFER Sylvain : Back-end Developer
- HERTSCHUH Louis : Front-end Developer
- FORTES Thomas : Front-end Developer
- ACKERMANN Mathieu : Mobile Developer
- SCHOTT Eliott : Mobile Developer
- GRUSSI Camille : Web Designer
