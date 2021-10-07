# EFA Red Badge Final Project
This README covers our final project of the course to complete Red Badge. We were instructed to come up with a unique idea for a full stack web app that could showcase what we have learned and challenge us to push even further.

## Clan Organizer
I went back and forth with several ideas, but ultimately settled on trying my hand at a gaming clan organizer. As a single parent raising my three kids, I do not play games nearly as much as I once did. However, I still enjoy gaming and believe that making something I have a bit of a *personal connection to* is a great way to drive myself toward doing my best.

My intention was to make an app that could help social-minded online gamers organize their clan activity. Many games have built around the concept of clans and many are open-ended enough to allow gamers a great deal of flexibility in playing socially. The game series I probably had most in mind while developing this early version was Diablo, but my vision for the app has been very neutral.

#### Functionality
Upon visiting the site, you will see the main dashboard. I have built everything around this dashboard page as the center, wanting to truly develop a single page experience. To that end, I came up with rendering my components through modal dialogs. Typically this is not seen as a best practice, but I felt that focusing each action to a singular window with relatively simple controls would be an enjoyable experience.

To log in, a user simply clicks on the Login button and is presented with a two-in-one dialog where they are presented with the option to register or flip to logging in via a clever ternary adapted from a previous project in the course. I struggled with a responsive action for logging in or registering, but did manage to implement a custom reusable dialog that I used to alert the user upon certain actions.

After logging in, the functionality of the site opens up and the user is able to make use of what has been completed to this point. The dialogs are closable by simply clicking out of the box.

#### Dependencies
For this client app, we needed to use React with TypeScript. I also decided to use Material UI for the interface library and made extensive use of some of its features. Overall I am quite happy with the UI for the app, but there are UI elements I feel could be improved upon a great deal through further development. I also made use of zustand for the custom reusable dialog.