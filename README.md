# HireMe
```
>Developed using React Native which is a Job Portal build similarly with Indeed.
>The enviroment is Expo CLI on top of that the project is build.
>Implemented with various functionalities and features which optimizes the hiring features making it smooth for working.
>Various jobs are listed and according to that users can apply to the job on their preferences.
>Functionality to track Job applications which will include application status.
>Well designed screens which is interactive and friendly for the user.

```
## Some Highlights of app.



## Features

```
1. Registeration
2. Login
3. Forgot Password
4. Apply to the job
5. Upload Resume
6. Add Basic, Education, Work Experience, Skills details
7. Track application status.

```

## Technologies Used

The HireMe is build using the following technologies:

<p>
  <img src="https://github.com/tandpfun/skill-icons/raw/main/icons/CSS.svg" alt="CSS Icon" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/raw/main/icons/JavaScript.svg" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/blob/main/icons/React-Dark.svg" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/blob/main/icons/ExpressJS-Dark.svg" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/blob/main/icons/MongoDB.svg" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/blob/main/icons/Python-Dark.svg" width="50">
  <img src="https://github.com/AdityaLambat/skill-icons/blob/main/icons/Flask-Dark.svg" width="50">
</p>

## Getting Started

To set up the API on your local machine, follow these steps:
````
1. Clone the repository.
2. Install the packages using npm

````

### After reaching the project directory you have to run the following command.
````
 npx expo start

````

### Folder Structure

````
HireMe
  ->|           
    |---> .expo 
    |                  
    |---> .vscode
    |
    |---> api --->|
    |             |---> models --->|
    |             |                |---> application.js
    |             |                |---> education.js
    |             |                |---> jobs.js
    |             |                |---> resume.js
    |             |                |---> users.js
    |             |                |---> workexperience.js
    |             |---> index.js
    |             |---> ip.js
    |             |                
    |---> assets
    |---> components --->|
    |                    |---> Button.js
    |                    |---> colors.js
    |                    |---> CustomButton.js
    |                    |---> FloatingLabelInput.js
    |                    |---> InputField.js
    |                    |---> PasswordValidation.js
    |                    |---> Styles.js
    |
    |---> navigation --->|
    |                    |---> AuthStack.js 
    |             
    |---> node_modules.js
    |
    |---> Screens --->|
    |                 |---> ApplicationScreen.js
    |                 |---> AppliesScreen.js
    |                 |---> ChangePasswordScreen.js
    |                 |---> EmailVerifyScreen.js
    |                 |---> ForgotPasswordScreen.js
    |                 |---> HomeScreen.js
    |                 |---> JobDetailsScreen.js
    |                 |---> JobScreen.js
    |                 |---> LoginScreen.js
    |                 |---> MainScreen.js
    |                 |---> OnBoardingScreen.js
    |                 |---> ProfileScreen.js
    |                 |---> RegisterScreen.js
    |---> .gitignore
    |---> App.js
    |---> app.json
    |---> babel.config.js
    |---> eas.json
    |---> package-lock.json
    |---> package.json
    |---> UserContext.js
    |---> yarn.lock

    ````
