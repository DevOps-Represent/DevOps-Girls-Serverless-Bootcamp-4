## Seek & DevOps Girls Bootcamp

DevOps Girls with the massive support from Seek are hosting a day-long bootcamp to explore all things Serverless!

If you're looking to be buzzword compliant, 'serverless' is on that list. We wanted to create an opportunity for people to learn about the technical concepts and get hands-on exposure in a super supportive and encouraging environment.

This is a one day bootcamp, that will introduce participants to AWS, Lambda, event-driven architecture, infrastructure as code, static website hosting, Serverless Framework.

Programming knowledge is helpful, but not required - code will be provided for you.
Basic command line skills would be very helpful and we would recommend completing a short code academy course on using the command line - (See Resources below)

Throughout the day, participants will first be introduced to concepts at a high level. Then you will get to practise yourself. We will start from deploying a simple website that will have some todos (classic!) and gradually move to more complex things, like an event that will be triggered when a todo is overdue, added, edited or removed.

We will be building on our project throughout the day and it's all good if you need help catching up because we will have a GitHub repo that will help you make sure you maintain progress.

********************************************************************************
NOTE, this event has limited spots - please update your RSVP if you're unable to attend so we can ensure as many people can attend as possible.
********************************************************************************

What will you expect from the day?
You'll have a team of supportive people from our industry dedicating their Saturday to your learning and development.

You'll be able to learn in a multi-modal format, including hands on and you'll have access to all the learning materials.

You'll have an opportunity to meet and network with people in your industry.

We'll have a room with video games and activities for kids.

The bootcamp will be fully catered - note dietary requirements in your RSVP

Things you'll need:
- a laptop! (but if this is not possible, send us a message)
- an AWS account - (See Resources below)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Schedule - The day!

8.45am-9.30am
Coffee and Snacks
AWS account creation help (if needed)

9.30am (sharp)
Welcome and kickoff
Key concepts
1st Learning Session

12pm-1.15pm
Lunch

1.15pm-2pm
Palette cleanser - TBC

2pm-3pm
2nd Learning Session

3pm-3.30pm
Afternoon Tea

3.30-5pm
Final Learning Session & 'Next Steps'

5pm-7pm
Networking and drinks (self funded)
OPTIONAL - Venue TBC
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# Resources

Command Line on Code Academy
(First lesson is enough)
https://www.codecademy.com/learn/learn-the-command-line

Guide on Creating and Configuring your personal AWS account and CLI
https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/aws_account_setup.pptx

AWS Tech Essentials Training (Optional)
For people starting out in cloud technology the AWS Tech Essentials course is free. It's a bit of a time commitment, but worthwhile for people getting started in learning cloud technology 
https://aws.amazon.com/training/course-descriptions/essentials/

### Building a serverless website in AWS
The goal of this blog post is to give an example of a serverless website, so don’t worry if the definition is rather vague: at the end you’ll have a better understanding of the concept. Let’s get started!
The website
The website that we’ll building will be, as is tradition, a todo list application. The todos will be stored in DynamoDB, and we’ll connect it to our website so that we can view, update, and create them.
We’ve setup a GitHub repository that contains the pieces of code required to run the website. Let’s begin with setting up the core of our application: the DynamoDB table.
DynamoDB
We will use DynamoDB, a managed NoSQL database. Setting it up is very easy and, just like all the components for our website, there is almost nothing that we will need to manage. The only thing we would have to manage is the capacity, which we shouldn’t set to high so we pay too much, but also not to low so clients’ requests will get throttled. For now though, the defaults will do fine.
Open up the DynamoDB console and create a new table. Let’s call it bootcamp_todo_list. Set the primary key to id. Click Create to create the table.
We now have a DynamoDB table in which we can insert data. If you’re more experienced with an SQL database such as MySQL, you might expect that we need to create a schema. This is not required: as long as we add entries that have the id unique field, DynamoDB will accept whatever you put in it. With that said, it’s time to setup the Lambda functions that will put and get data to/from the table.
Setup Lambda functions
We will be writing several different lambda functions, to cover the operations of our todo program. We need one to save new todos to the database, one to delete existing todos from the database, and one to retrieve the list of todos that we already have, to be displayed on the website.

As discussed earlier, lambdas can be triggered by lots of different event types. Today however, our functions will all be responding to HTTP events, that is requests from our website.

Our first step is to create a role that will give our lambda the permissions it needs to run our functions:
1.	Open up the IAM Console. On the left, click Roles and click the “Create new Role” button at the top.
2.	Under the “AWS Service Role” tab, choose “AWS Lambda”. We’re going to create a role specifically for AWS Lambda.
3.	Type “DynamoDB” in the search field now visible. Select the “AmazonDynamoDBFullAccess” policy (NOTE: this gives you much more permissions than required, so create a custom policy with only the required permissions if you’re doing this in a production environment).
4.	Give the role a name such as “lambda-dynamodb-full-access” and click “Create role”.
