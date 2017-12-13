## Questions one:
There are now three .gitignores. One for the project as a whole, one for the client, and one for the server. They can be found at:
1) .gitignore
2) client/gitignore
3) server/.gitignore

The main .gitignore deals with major project files such as the .idea folder, dependency libraries and config files.
The reason why we need many of gitignore is that our directory has so many various files and different frameworks.
It is necessary to have .gitignore for these directory.


## Question two:
The reason behind this is that we now have many gradle test to run.
Such as server unit tests, there are now client tests, as well as end to end tests.
It is necessary to have multiple build.gradle in the directory.

##Question three:
Navbar in this project is a built-in access for our project routing.
It is a component that is contained in the app directory.
SparkJava only provide API for our data searching purpose.

##Question four:
The user-list.service.ts handles the requests to the server.
On the other hand, User-list.component.ts handles the responds from the server.
The component files also contains html file. It set up front-end access connected to its
back-end ts file.
Set up them differently would be helpful as security purpose.
