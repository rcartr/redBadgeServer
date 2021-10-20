# EFA Red Badge Final Project
This README covers our final project of the course to complete Red Badge. We were instructed to come up with a unique idea for a full stack web app that could showcase what we have learned and challenge us to push even further. My intention is to continue working on this as a side project.

## Clan Organizer
#### Origin/Intention
I went back and forth with several ideas, but ultimately settled on trying my hand at a gaming clan organizer. As a single parent raising my three kids, I do not play games nearly as much as I once did. However, my kiddos enjoy gaming, I still enjoy gaming, and believe that making something I have a bit of a *personal connection to* is a great way to motivate some passion in a project.

My intention was to make an app that could help social-minded online gamers organize their clan activity. Many games have built around the concept of clans and many are open-ended enough to allow gamers a great deal of flexibility in playing socially. The game series I probably had most in mind while starting to develop this was Diablo, but my vision for the app has been very neutral.

#### Functionality
The back end for this app is beginner level, fairly straightforward. This is my first real solo project without training wheels and it will likely become progressively higher quality. I have written endpoints with some rudimentary role based access tied to the "role" field in the user table, though the bulk of role based functionality will be written into the client. I have database associations for the user, clan, and event tables, in order to tie users and events to the clan.

#### Endpoints
-"user/register" - (POST) Registers a new user with email, username, password.
-"user/login" - (POST) Logs in a user with email/password combination.
-"user/update/:email" - (PUT) Update user information by matching email.
  -This endpoint is also accessed for adding new members to a clan.
-"user/members" - (GET) Displays all users matching the requestors clan id.
-"user/delete/:email" - (DELETE) Deletes a user from the database.
-"clans/create" - (POST) Creates a new clan with a name and description.
-"clans/update/:id" - (PUT) Change clan name or description/message of the day.
-"clans/show" - (GET) Displays clan information matching requestors clan id.
-"clans/delete/:id" - (DELETE) Deletes a clan from the database. This is not accessible in the client currently.
-"events/create" - (POST) Create a new event with date, name, description, createdBy strings.
  -I want to change the date type from string to date for proper handling, but string was more suitable for early development.
-"events/update/:id" - (PUT) Updates event information.
-"events/show" - (GET) Displays all events matching requestors clan id.
-"events/delete/:id" - (DELETE) Deletes an event from the database.

#### Dependencies
For this server app, the following dependencies:
-bcryptjs
-dotenv
-express
-jsonwebtoken
-pg
-pg-hstore
-sequelize