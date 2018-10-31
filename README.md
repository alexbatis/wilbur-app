# wilbur-app

> Desktop app to quickstart [NodeJS](https://nodejs.org/en/) + [ExpressJS](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/) application development (all code written in [TypeScript 3.x](https://www.typescriptlang.org/))

wilbur allows you to quickly and easily define an application and its associated typescript classes and in return you get a fully featured [NodeJS](https://nodejs.org/en/) application server in just seconds. 

By simply defining a class (class name, its member variables and their types & constraints, etc) you are provided with the code for a [TypeScript](https://www.typescriptlang.org/) class with strong field validation which by default interfaces with [MongoDB](https://www.mongodb.com/), a [MongoDB](https://www.mongodb.com/) service, request controllers/validators/routers, and [Swagger](https://swagger.io/) documentation. You get all of these features from writing absolutely zero code.

## Download the app
- [Windows]()
- [MacOs](https://uploadfiles.io/28arp)




## Features
When you generate an app with wilbur you will enjoy a fully features api server without having to write a single line of code
Features include:

- [NodeJS](https://nodejs.org/en/) + [ExpressJS](https://expressjs.com/) API server written entirely in [TypeScript 3.x](https://www.typescriptlang.org/) generated in just seconds
- Built-in [MongoDB](https://www.mongodb.com/) functionality (uses [TypeGoose](https://github.com/szokodiakos/typegoose) to create [Mongoose](https://mongoosejs.com/) models from typescript classes)
- Strong request validation using [express-validator](https://github.com/express-validator/express-validator) and [class-validator](https://github.com/typestack/class-validator)
- Pretty logging with [Pino logger](https://github.com/pinojs/pino)
- Interactive [Swagger](https://swagger.io/) documentation
- Production building with [backpack](https://github.com/jaredpalmer/backpack)
- Built-in [Mocha](https://mochajs.org/) testing framework
- Beautiful automated HTML testing reports with [mochawesome](https://github.com/adamgruber/mochawesome)
- Extensive code coverage reports with [istanbul](https://github.com/gotwarlost/istanbul)
- Ability to continuously add, update, and remove classes from your app after generation

### Generator Features
- ##### Main Process Written in Typescript
    - Reap all the benefits of writing in typescript in the main electron process that interfaces with the [yeoman environment](https://github.com/yeoman/environment)
    - Eliminates need for previous dependencies such as [babel-plugin-transform-es2015-modules-commonjs](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-modules-commonjs), [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015), [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react), [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0), [babel-register](https://github.com/babel/babel/tree/master/packages/babel-register), and more. 
- ##### Renderer process written in Angular 6
    - Using [angular-electron](https://github.com/maximegris/angular-electron) developing and building an electron desktop app has never been easier
    - Leverages [ngrx](https://github.com/ngrx/platform) for easy state control using [rxjs](https://github.com/ReactiveX/rxjs) observables


## Prerequisites
- [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed (also works with [Yarn](https://yarnpkg.com/en/))
- [Yeoman](http://yeoman.io/)
- [wilbur-generator](https://github.com/alexbatis/generator-wilbur)
- [MongoDB](https://www.mongodb.com/) (required to run generated app, not required for generator)

### Installation & Usage
First, install the wilbur **yeoman generator** 
```sh
$ npm i generator-wilbur -g
```

Next, **download and run the executable**
- [Windows]()
- [MacOs]()

*Thats it.* You're ready to start generating rich NodeJS+ExpressJS apps in seconds __without writing a single line of code__.

### Alternative Usage
If you want to run the desktop application without directly downloading the executables, you can clone this project and run the project yourself.
```sh
$ git clone https://github.com/alexbatis/wilbur-app
$ cd wilbur-app
$ npm install
$ npm start
```

If you'd like to build an executable from the project, just run the following:
```sh
$ npm run electron:<platform>:dev
```
where platform is windows or mac based on your os.



If you want to use this as a boilerplate to start your own angular project that interacts with the yeoman environment, check out the sections below on installation and development.


## Contributing
If you're interested in contributing, please reach out. This app is still in its infancy, but if there is the demand I'd be willing to allocate more time to it.  All contributions and feedback are welcomed. 

### References
- [yeoman](https://github.com/yeoman)
- [yeoman-app](https://github.com/yeoman/yeoman-app)
- [angular](https://github.com/angular)
- [electron](https://github.com/electron/electron)
- [angular-electron](https://github.com/maximegris/angular-electron)

License
----


MIT © [Alex Batis](https://github.com/alexbatis)
