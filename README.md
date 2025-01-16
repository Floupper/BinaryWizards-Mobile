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
  - See his unfinished games
  - Search through a list of public quizzes, created by other users
  - Play quizzes with friends (scrum and team mode)

## Prerequisites

Before you can run the Mobile project, which is the mobile quiz application, you need to ensure you have an API.

You can either work locally with the API and the mobile app, or use a remote API.  
In this case, you have two options:

- Local API
- Remote API

For the local API, you need to install the [API project](https://git.unistra.fr/binarywizards/s5-binarywizards-serveur/-/blob/dev/README.md?ref_type=heads).  
For the remote API, no installation is required, you just need to know the IP address or URL of your API.

## Installation

```
git clone <project_remote_URL>
```

Before launching the mobile app, you need to navigate to the project folder.

```
cd BinaryWizards-MobileApp
```

Then, you need to create a _.env_ file containing the following information:

```
REACT_NATIVE_API_URL=<url_or_IP_address_of_your_API>
REACT_NATIVE_API_PORT=<port_of_your_API>
```

Once the _.env_ file is created and filled out, you can install the dependencies and launch the application with the following commands:

```
npm install
npx expo start
```

## App features

### Anonymous user

When the user is not logged in, he can still play quizzes.

![](/readme_assets/readme_anonymous.jpg "Anonymous home screen")
![](/readme_assets/readme_quickquiz.jpg "Quick quiz screen")

### User account

When the user is logged in, he can play quizzes, see his unfinished games, search through a list of public quizzes, and play quizzes with friends.

![](/readme_assets/readme_signin.jpg "Login screen")

### Play quizzes

The user can play quizzes, whether he is logged in or not.

![](/readme_assets/readme_quickquiz.jpg "Quick quiz screen")

### Unfinished games

When the user is logged in, he can see his unfinished games.

![](/readme_assets/readme_resumegame.jpg "Resume game screen")

### Search public quizzes

When the user is logged in, he can search through a list of public quizzes, created by other users.

![](/readme_assets/readme_searchquiz.jpg "Search quiz screen")

### Play with friends

When the user is logged in, he can play quizzes with friends. Two modes are available: scrum and team mode.

![](/readme_assets/readme_joingame.jpg "Join game screen")
![](/readme_assets/readme_endscreenteam.jpg "Join game screen")

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
