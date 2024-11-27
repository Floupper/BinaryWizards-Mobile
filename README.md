# Prerequisites
Before you can run the Mobile project, which is the mobile quiz application, you need to ensure you have an API.

You can either work locally with the API and the mobile app, or use a remote API.  
In this case, you have two options:
- Local API
- Remote API

For the local API, you need to install the [API project](https://git.unistra.fr/binarywizards/s5-binarywizards-serveur/-/blob/dev/README.md?ref_type=heads).  
For the remote API, no installation is required, you just need to know the IP address or URL of your API.

# Installation
```
git clone <project_remote_URL>
```

Before launching the mobile app, you need to navigate to the project folder.
```
cd BinaryWizards-MobileApp
```

Then, you need to create a *.env* file containing the following information:
```
REACT_NATIVE_API_URL=<url_or_IP_address_of_your_API>
REACT_NATIVE_API_PORT=<port_of_your_API>
```

Once the *.env* file is created and filled out, you can install the dependencies and launch the application with the following commands:
```
npm install
npx expo start
```
