### Building a serverless website in AWS via the 'Clickops' method

## What we are going to do

In this practical session, we will

- Create a S3 bucket and configure it as a web server
- Load the static pages of our website to the bucket
- Create a DynamoDB
- Create a Lambda that updates our site based on changes to the DynamoDB
- Create an API Gateway

Let's take a look at how this hangs together and what we're going to be creating!

![Architecture](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/architecture.png?raw=true)

---

## Create S3 bucket as a web server

### 1.) Creating an S3 Bucket

Go to Services > S3, then click on "Create Bucket"

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-1-create-s3-bucket.png?raw=true)

### 2.) Choose a name for S3 Bucket

Enter a unique bucket name and click "Next". The bucket name has to be globally unique. So use something like `yourname-devopsgirls-site`

![s3](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/s3_1.png?raw=true)

### 3.) Accept defaults for "Configure Options"

Click "Next" without making any changes.

### 4.) Make bucket public

WE ADVISE NEVER MAKING AN S3 BUCKET PUBLIC! Unless you're using it to host a website, then you need to make it public so people can view your site.

So when you get to the 'permissions' options, this means you're UNTICKING these boxes:

![s3](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/s3_2.png?raw=true)

### 5.) Confirm bucket creation

Review the inputs, and click "Create Bucket"

![Create Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-5-create-s3-bucket.png?raw=true)

## Configure S3 bucket as a webserver

### 1.) Choose the S3 bucket just created

Click on the bucket you just created

You can find the list of S3 buckets in your AWS account via Services > S3

### 2.) Modify bucket properties

Click on the "Properties" tab, and click on "Static Website Hosting"

![Configure Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-7-configure-s3-bucket.png?raw=true)

### 4.) Configure bucket to host a website

Choose "Use this bucket to host a website", enter "index.html" in the "Index document" text box, and click "Save" 💾

![Configure Bucket](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-8-configure-s3-bucket.png?raw=true)

## Copy the static website files to S3 bucket and make them public

### 1.) Copy the static files to S3 bucket

Download the `ui-dist.zip` file from our DevOps-Girls repository:

<https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/ui-dist.zip>

Unzip `ui-dist.zip`.

Go to `https://s3.console.aws.amazon.com/s3/buckets/yourname-devopsgirls-site` and upload the files via the AWS console (keep all the defaults).

### 2.) Confirm files have been uploaded

Navigate to the S3 bucket in the AWS console, and confirm all the files are listed there.

### 3.) Make files public

Choose all the files, click on "Actions" and choose "Make Public". When prompted, confirm by clicking "Make Public" again

![s3 public](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/s3_filepublic.png?raw=true)

### 4.) Access the website

Note down the public URL of the S3 bucket and click on URL

![Website](https://github.com/DevOps-Girls/devopsgirls-bootcamp3/blob/master/images/3-3-serverless-static-site/3-3-10-s3-public-endpoint.png?raw=true)

Your website should now look like this!

![ui](../images/finishedUI.png?raw=true)

<details><summary>Didn't Work?</summary><p>

Here's a couple things to check if you site didn't work

- Did you select all 6 website files to make them public?
- Check your bucket policy, is your bucket name arn correct next to "Resource"
- Are your public access settings correct?

</p></details>

---

## Create a DynamoDB

Let's create a database to store our to-dos! We're choosing DynamoDB, which is a fully managed NoSQL database. Fully managed means AWS manage scaling in response to demand, patching or configuration.
'NoSQL' means the data is stored using key value pairs, which is different to an SQL database which is a table (think excel spreadsheet).

### 1.) Click Services > DynamoDB > Create Table

![DynamoDB](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/dynamo_1.png?raw=true)

### 2.) Enter table details:

- Table Name: devops-girls-[your name]
- Primary Key: id (This is the 'key' in your 'key value pair')

![DynamoDB](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/dynamo_2.png?raw=true)

---

## Create a Lambda Function

Now we need a function that puts new values into our Dynamodb via API requests such as Create, Read, Update and Delete. These are added via our UI (User Interface) - that's the code you uploaded and now hosting in an S3 bucket.

### 1.) Click Services > Lambda > Create Function

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_1.png?raw=true)

### 2.) Let's Create a Lambda Function from Scratch

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_2.png?raw=true)

...then fill in the required fields as per the below:

- Name: [yourname_lambda_fn]

- Runtime: Nodejs

- Role: 'Create new role from one or more templates'

- Role Name: [yourname_lambda_role]

- Policy Templates: Simple Micoservices Permission

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_3.png?raw=true)

### 3.) Add your Lambda Code

Think back to the [architecture diagram](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/architecture.png?raw=true)
, the thing that allows our web app to actually work is a Lambda Function.

Click on the name of your Lambda Function at the top of the page

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_code.png?raw=true)

Delete the hello world code example below and replace it with the code from this example:

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_4.png?raw=true)

Add the index.js code via this link: [link](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/serverless-final-todo/index.js)

### 4.) Environment Variables

Your Lambda code will need to know what to look for to execute the function. For example, our Lambda Function will need to know the name of your DynamoDB!

`key = TABLE_NAME`

`value = it's what you called your DynamoDB table, open up a new tab and copy and paste the name in this field 🧐`

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_6.png?raw=true)

Click "Save", it's in top right of your screen

![Lambda](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/lambda_8.png?raw=true)

---

## Create your API Gateway

We need our API Gateway to allow our static website to be able to talk to Lambda and DynamoDB

### 1.) Click Services > API Gateway > Create

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_1.png?raw=true)

### 2.) Use the following options for creating your API gateway:

Something to note, we're choosing REST, as this is more typically used for web services as it uses HTTP methods to relay data. Websocket relies on knowing the IP and socket details, where as REST only needs to know HTTP verbs like GET, PUT, DELETE etc. A websocket is more likely to be used where connections are known to each other, like a real time chat application.

For the purpose of learning, our Endpoint type will be regional, which means our site will be optimised for users in the same region.

Now choose the options in the screenshot below:

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_2.png?raw=true)

Now we have an API, we need to create from 'programmable entities'. Without diving into the complexity now, this is how we create the 'method resources' i.e. POST, GET, DELETE etc. For us, we're not fussy, so we want all the HTTP methods.

Then go to Resources > Actions > Create Resource

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_resource.png?raw=true)

- Click "Configure as Proxy Resource" check box

- Click "Enable API gateway CORS" check box

Note that the resource name and path fields now have values, keep those in there.

- Click "Create Resource"

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_5.png?raw=true)

then...

Enter the name of your Lambda Function

Click "Save"

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_6.png?raw=true)

Resources > Actions > Deploy API

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_deploy.png?raw=true)

Stage > name your stage 'dev'

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_8.png?raw=true)

Click "Deploy"

## Here is where your URL appears! Now let's try your todo!

![APIGateway](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/blob/master/images/api_endpoint.png?raw=true)

In your static website, click the 'Set API URL' link to bring up the input field, and paste in your new URL.

![yourAPI](../images/URLBar.png?raw=true)

Add some TODOS!

<details><summary>Didn't Work?</summary><p>

Here's a couple things to check if you final web app didn't work

- TODOs not going to your Dynamodb? - Select the correct permissions for your lambda function? Click the 🔑 icon in your lambda function to check the IAM role for your function. It will need to be able to access your dynamoDB and allow requests from the API Gateway.
  It should look like this:

```
{
  "roleName": "serverless-final-todo-dev-ap-southeast-2-lambdaRole",
  "policies": [
    {
      "document": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Action": [
              "logs:CreateLogStream"
            ],
            "Resource": [
              "arn:aws:logs:ap-southeast-2:581696986433:log-group:/aws/lambda/serverless-final-todo-api-dev:*"
            ],
            "Effect": "Allow"
          },
          {
            "Action": [
              "logs:PutLogEvents"
            ],
            "Resource": [
              "arn:aws:logs:ap-southeast-2:581696986433:log-group:/aws/lambda/serverless-final-todo-api-dev:*:*"
            ],
            "Effect": "Allow"
          },
          {
            "Action": [
              "dynamodb:DeleteItem",
              "dynamodb:PutItem",
              "dynamodb:Scan"
            ],
            "Resource": "arn:aws:dynamodb:ap-southeast-2:581696986433:table/serverless-final-todo-dev-DatabaseTable-1O5NZFT2VDQWL",
            "Effect": "Allow"
          }
        ]
      },
      "name": "dev-serverless-final-todo-lambda",
      "type": "inline"
    }
  ],
  "trustedEntities": [
    "lambda.amazonaws.com"
  ]
}
```

- TODOs not going to your Dynamodb? - Check your environment variables for your Lambda function, make sure the TABLE_NAME is correct (should match the name you gave your dynamodb)
- API not working? - Check the settings of your API Gateway, did you create the child resources correctly?

Make sure you grab a volunteer to help if you're stuck!

</p></details>

![finished-ui](../images/finishedUIWithURLBar.png?raw=true)

Great job, you have exercised the paitence of a saint clicking around the AWS console 😇 , but imagine if you needed to do this 10 more times?! Let's look at a better way of doing things with the Serverless Framework, head to [The Serverless TODO starter repo](https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/tree/master/serverless-starter-todo) to work through this.
