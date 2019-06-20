# isamrs13

Project for faculty course ISA and MRS, Team 13.
## Contributors:

* Nenad Mišić (SW31/2016),
* Branislav Anđelić (SW6/2016),
* Nikola Ignjatović (SW20/2016)

# Installing the application
In order to install the application, you should install packages for each server running, by running a "npm install" command in ahref-backend, ahref-websockets and ahref-frontend folders.
To run databases, you should download [mongoCLI](https://www.mongodb.com/download-center/community) for mongoDB and [pgAdmin](https://www.pgadmin.org/download/) for postresql

# Running the application
1. Navigate to mongo database folder, or if you don't have it, create a folder where you will store mongoDB, and another folder named data inside of it
2. (*) mongod --dbpath=data (Starting a mongoDb server)
3. Start postres database named ahref using pgAdmin application.
4. Navigate to root folder of the project (isamrs13)
5. .\ahref-backend\bin node automigrate.js (If it's your first time running a postgres database, let the server do the migration for you, otherwise skip this step)
5. (*) .\ahref-backend npm start (starting a loopback server)
6. (*) .\ahref-websocket node index.js (starting a websocket server for live synchronization of friend requests)
7. (*) .\ahref-frontend ng serve (starting a front-end application)
8. Run browser at http://localhost:4200/ to use the application, or http://localhost:3000/explorer to browse documentation for backend rest api 

(*) - Steps beggining with this sign should be started by adding "start cmd /k" before a command to start it in new command prompt instance.  For example, step 5 should be run as "./ahref-backend start cmd /k npm start".

# Batch script for running the application

```batch
start pgAdmin3
cd "<<path to mongoDB database folder>>"
start cmd /k mongod --dbpath=data
ping 127.0.0.1 -n 6 > nul
cd "<<path to isamrs13 (the root folder of the project)>>"
cd ahref-backend
start cmd /k npm start
cd ..
cd ahref-frontend
start cmd /k ng serve
cd ..
cd ahref-websockets
start cmd /k node index.js
```
