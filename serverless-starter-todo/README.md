# Serverless Starter TODO

Starter template for a Serverless API and backing database.

## 1. Clone template

```shell
serverless create --template-url https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/tree/master/serverless-starter-todo

# Serverless: Generating boilerplate...
# Serverless: Downloading and installing "serverless-starter-todo"...
# Serverless: Successfully installed "serverless-starter-todo"

cd serverless-starter-todo
```

## 2. Review `serverless.yml`

The `serverless.yml` begins by listing out some names, and the cloud provider
and environment we will be using:

```yaml
service: serverless-starter-todo

provider:
  name: aws
  runtime: nodejs8.10
  stackName: serverless-starter-todo-dev
  stage: dev
```

---

What do you think this section does?

```yaml
package:
  include:
    - greeter.js
    - handler.js
```

<details><summary>answer</summary>
The package section describes the code files on your computer that need
to be uploaded to AWS, to run on Lambda.
</details>

---

How about this section?

```yaml
functions:
  TodoApi:
    name: serverless-starter-todo-api-dev
    handler: greeter.greet
    events:
      - http:
          cors: true
          method: any
          path: /{proxy+}
```

<details><summary>answer</summary>
The functions section describes a Lambda function that can respond to HTTP
requests.
</details>

## 3. Try a deployment

Run the `serverless deploy` command:

```shell
serverless deploy --region ap-southeast-2 --verbose

# Service Information
# service: serverless-starter-todo
# stage: dev
# region: ap-southeast-2
# stack: serverless-starter-todo-dev
# api keys:
#   None
# endpoints:
#   ANY - https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/{proxy+}
# functions:
#   TodoApi: serverless-starter-todo-dev-TodoApi
```

---

Review your changes in the AWS web interface:

- <https://console.aws.amazon.com/cloudformation/home>
- <https://console.aws.amazon.com/apigateway/home>
- <https://console.aws.amazon.com/lambda/home>

---

Try out your new API (swap out `1234567890` with your real subdomain):

<https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/todo>

You should see `hello world` on the webpage.

## 4. Add a database table

Have a quick look at the CloudFormation documentation:

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html>

---

We care about the following properties:

- `AttributeDefinitions`, `KeySchema`: define primary key in our table
- `BillingMode`: set this to `PAY_PER_REQUEST` to avoid ongoing costs while the
  database is idle
- `TableName` (optional): you can choose one, or have one generated for you

---

Add a new `resources` section to your `serverless.yml`:

```yaml
resources:
  Resources:
    DatabaseTable:
      Type: AWS::DynamoDB::Table
      Properties:
        # more stuff here
```

Here, you can describe any AWS infrastructure supported by CloudFormation, and
it will be created/updated as part of your `serverless deploy`.

---

Try another deployment to create your database table:

```shell
serverless deploy --region ap-southeast-2 --verbose
```

---

Review your changes in the AWS web interface:

<https://console.aws.amazon.com/dynamodb/home>
