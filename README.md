# Mainstack-BE-Test

## Prequisites
- Must have an understanding of Nodejs, ExpressJs, TypeScript and Mongoose.
- Must have an understanding of Unit tests.
- Must have Docker already installed in your PC.
  
## Installation Procedure

- Navigate to a folder of your choice and clone the the repo into you local using:
```
git clone https://github.com/chukwudiezeh/Mainstack-BE-Test.git
```

- On your terminal, navigate into the project folder and run the following commmands:
  
  - Makes the shell file executable
    ```
    chmod +x bin/start_disposable.sh
    ```
  then, 
    ```
      bin/start_disposable.sh
    ```
The above command handles everything from building the docker image to running the container. 
It also exposes the bash after starting the container.

then run this command in the bash:
```
npm run start
```

## Unit Tests
- once you're within the bash exposed after creating the container, use the commands below as fits:
  - To run tests one module at a time
  ```
  npm run test -- --testPathPattern=[testFileName]
  ```
  For example:
  ```
  npm run test -- --testPathPattern=auth.test.ts
  ```
  
  - To run all tests at once
    ```
    npm run test
    ```
