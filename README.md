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
- On your terminal, navigate into the project folder.
- Create a new file `.env` in the project root folder. Copy the contents of `.env.sample` file and paste into it

### Wanna Run with Docker?
- after creating the `.env` file, run the following commmands:
  
  Makes the shell file executable
    ```
    chmod +x bin/start_disposable.sh
    ```
  then, 
    ```
      bin/start_disposable.sh
    ```
  The above command handles everything from building the docker image to running the container. 
  It also exposes the bash after starting the container.

  - Then run this command in the bash:
    ```
    npm run start
    ```
  - Then on another terminal tab, run 
    ```
    docker ps
    ```
  - To see the list of active containers. copy the IP:port exposed by the container and paste on your browser, you should get a succes json message.

# Wanna Run directly on your Machine?
- on you terminal, navigate into the project folder and run the following commands:
  - To install packages
    ```
    npm install
    ```
  - Transpile TS to JS
    ```
    npm run build
    ```
  - Run the application
    ```
    npm run start
    ```
## Unit Tests
- while within the bash exposed after creating the container (If runnin with Docker) or just within your project folder on your terminal, use the commands below:
  - To run tests one module at a time
  ```
  npm run test -- --testPathPattern=[testFileName]
  ```
  For example:
  ```
  npm run test -- --testPathPattern=auth.test.ts
  ```