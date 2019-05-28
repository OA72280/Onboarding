## Launch On-Boarding Site

This project was created to help the launch team keep track of small tasks that need to be completed and marked. This originally was a spreedsheet that was shared with the employees, however, a website with the ability to be working on live and also available on any computer was a huge benfit and the reason the site was created. There are 4 main components to the current site 

### `Tasks`

This is where the manager can create small tasks, such as finish I9 paper work, and then the employee can select wether or not they have started or completed each task. These help the manager to quickly glance at who as completed what tasks and they are currently broken into 4 parts, This Week Tasks, Next Weeks Tasks, Looking Ahead Tasks, and Past Due Tasks. They are organized by the date they are due to make it easier for the employees to see what needs to be done. Also, as the manager you have the ability to delete old tasks that don't need to be in there any more, like completing all I9 paper work, once you know everyone is done you can click the 'X' on the task to remove it from all the members in that team. To create these tasks all you have to do is click the "Add Task" button in the nav bar and a dialog box will pop up to fill out.  

### `Components`

Components were build to handle the tasks that take more than a yes or no answer. The best example of these would be Location Preference upon completion of launch. You can click "Add Component" in the nav bar and name the component, add fields, and also label them for the employees to fill out. Once created the employees will see these on their dashboard and be able to fill them out with what ever is being asked of them.  

### `Calendar`

The calendar acts as a quick glance for employees to see what the have coming up in terms of their tasks. Whenever a task is created, it is automatically connected to the calendar. We were wanted to get it to send an email to the employees to match up with the calendar however I ran out of time as it was causing problems with other parts of the site. 

### `Mentors`

This tab is meant for the manager to be able to create quick people cards with different mentors and executive mentors for the employees, you do this by clicking add mentor and from their you fill out the different fields about that person. Once they are created, you can click on the box and a dialog will pop up where you will be able to add different people as mentees to that mentor. 


## Where is the data stored?

All the data for this application has been stored in a google service called [Firebase](https://firebase.google.com/). Firebase is a quick way to be able to store and acess saved information and is what I choose for this project. There are many services that firebase offers, but I only used the Authentication, Database, and Storage. The Authentication is what handles everyones email and passwords, database stores the main data behind each user and team, and the storage stores the pictures associated with each person. Although I have tested everything and could not find any problems with the site, I will put a description here so that you can be able to fix any problems that arise on the site from the backend.

## Database Layout?

The database is layed out into pages, on the left of the dash is 2 main columns. There is leaders, which stores all the Unique Identifiers (UIDs) of each leader which is mostly just a copy of the leader object from the team but needed to be sepereated for the sake of a feature in the site. Secondly there is the team objects, they are the random characters on the right side. When you click on one, the second column will display all the employees UID, Leader UID, and teamData. Team data just holds the name of the team (Ex. Fall 2019 LAUNCH) and then each user UID holds all the informaiton for that user. I will now break down each component in the user objects

### `Components`

This is an array of objects that stores the blanks with the labels to be filled out by the employees. The key is the label and the value is the value inputed by the user 

### `Email`

Email entered at user creation

### `Leader`
 
Boolean value if they are a leader

### `Mentors`

Array of mentor objects (the mentor objects are stored in the leader object and then assigned to the employee object when assigned)

### `Name`

Name entered at Creation of User

### `Picture`

Picture that was saved at creation of user. It is saved in the storage of firebase and referenced by a url.

### `Task`

The tasks are an array of object that have the completion value (0, 1, 2), a due date, and taskName

### `Team`

UID of the team they are apart of
















