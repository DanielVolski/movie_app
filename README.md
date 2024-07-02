
# movie_app
Trabalho de POOIII usando Ionic

## Requirements

- Node.js 20
- Firebase
- Typescript
- Ionic

## Installing Requirements

### Installing Node.js

Installing Node.js on Windows:
```
winget install Schniz.fnm
# download and install Node.js
```
Then:
> You may need to restart the terminal
```
fnm use --install-if-missing 20
```

Installing Node.js on Linux:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Then:
> You may need to restart the terminal
```
nvm install 20
```

### Installing Ionic

```
npm install -g @ionic/cli
```

### Download the project

```
git clone https://github.com/DanielVolski/movie_app.git
```

### Configuring Firebase

Before running the project, you must create a project in Firebase. After creating the project, insert the generated credentials into the new file `src/environments/environment.prod.ts`.

The configuration file looks like this:

```
export const environment = {	
    production: true,	
    firebaseConfig: {	
      apiKey: "",	
      authDomain: "",	
      projectId: "",	
      storageBucket: "",	
      messagingSenderId: "",	
      appId: ""	
    }	
};	
```

In addition, you can use the authenticator to enable Google and GitHub Login. For more information, read the [documentation](https://firebase.google.com/docs/projects/api/workflow_set-up-and-manage-project).

### Running

Navigate to the project directory:
```
cd movie_app
```
Run with Ionic:
```
ionic serve
```
> It is likely that errors related to Firebase will occur. If this happens, you can insert `<T>` in the lines where it is missing. However, this is not a recommended change, so proceed with caution.

*Now the project will run at http://localhost:8100*
