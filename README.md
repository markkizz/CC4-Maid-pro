# Maid Pro
Educated in Code Camp 4

## 📖 Description

- Maid Pro is a web application for group cc4 learner
- Maid Pro is a web application about Employer and Maid matcher

## 💡 Getting Start

### Install Backend and Frontend Libraries:
NPM:
### ```  npm install && cd frontend-maid-pro && npm install && cd ../backend-maid-pro && npm install && cd .. ```
or YARN:
### ```  npm install && cd frontend-maid-pro && yarn && cd ../backend-maid-pro && yarn && cd .. ```

### Provide database:
NPM install sequelize-cli:
### ```cd backend-maid-pro && npm install -g sequelize-cli && cd ..```  

or YARN install sequelize-cli:
### ```cd backend-maid-pro && yarn global add sequelize-cli && cd ..```

And then Create Database:
### 1. `cd back-maid-pro && sequelize init:config`
Change Password in Sequelize config
1. Open ./backend-maid-pro/config/config.json
2. Edit "password" in "development" to be your MySql's password
3. Edit "database" to be "cc4_maid_pro"
4. Add "salt_length": 12 into "development" object.

### 2. `cd backend-maid-pro && sequelize db:create && cd ..`

## ✔ Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.  
Open [http://localhost:8080](http://localhost:8080) to view it in the browser. (Client side)
And [http://localhost:3333](http://localhost:3333) will be your server side.

Run only Backend:
### `npm run start:backend` or `yarn start:backend`

Run only Frontend:
### `npm run start:frontend` or `yarn start:frontend`

## 🛠 Built with...
### Frontend (📂 frontend-maid-pro)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) - Project creator
- [React](https://reactjs.org/) - Front-end framwork
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
- [styled-components](https://www.styled-components.com/) - A CSS framwork allows developer write actual CSS code to style React components
- [Ant Design](https://ant.design/) - A design system base react components

### Backend (📂 backend-maid-pro)
- [NodeJS](https://nodejs.org/dist/latest-v12.x/docs/api) - Open source server environment for JavaScript
- [Sequelize](https://sequelize.org/v5/index.html) - Object Relational Mapping library
- [ExpressJS](https://reactjs.org/) - Server side framework


## 🤘 Authors  

1. Mark
2. Hon  
3. Korn
4. Bell
5. May
6. Tong