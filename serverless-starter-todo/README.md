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

Try to call your new API.
