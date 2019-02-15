# Serverless Final TODO

Complete template for a todo app. You may compare your solution to this example
after you're done, or use it as a reference if you get stuck.

```plaintext
S3 -- API Gateway -- Lambda -- DynamoDB
```

> **Disclaimer:** for ease of use, the API will have CORS fully enabled, reveals
> server error details to the client, and has no authentication. You shouldn't
> have such a configuration on an actual production system.

## Prerequisites

1. [AWS CLI](https://aws.amazon.com/cli/)

1. AWS credentials on your computer:

   ```shell
   aws configure
   ```

1. [Node.js + npm](https://nodejs.org/)

1. Serverless Framework:

   ```shell
   npm install -g serverless
   ```

## Create from template

```shell
serverless create --template-url https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/tree/master/serverless-final-todo

# Serverless: Generating boilerplate...
# Serverless: Downloading and installing "serverless-final-todo"...
# Serverless: Successfully installed "serverless-final-todo"

cd serverless-final-todo
```

## Deploy resources

Deploy API stack:

```shell
serverless deploy --verbose

# Service Information
# service: serverless-final-todo
# stage: dev
# region: ap-southeast-2
# stack: serverless-final-todo-dev
# api keys:
#   None
# endpoints:
#   ANY - https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/{proxy+}
# functions:
#   TodoApi: serverless-final-todo-dev-TodoApi

# Stack Outputs
# WebsiteBucketName: serverless-final-todo-dev-websitebucket-abcdefghijklm
# WebsiteURL: http://serverless-final-todo-dev-websitebucket-abcdefghijklm.s3-website-ap-southeast-2.amazonaws.com/
```

Upload static website assets:

```shell
aws s3 sync ./website/ s3://serverless-final-todo-dev-websitebucket-abcdefghijklm/
```

## Test API

macOS and Linux (sh):

```shell
subdomain='1234567890'

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

# []

curl --data 'Prepare bootcamp content' --request PUT "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo/1"

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

# [{"description":"Prepare bootcamp content","id":"1"}]

curl --request DELETE "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo/1"

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

# []
```

Windows (PowerShell):

```powershell
$subdomain='1234567890'

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

#

Invoke-RestMethod -Body 'Prepare bootcamp content' -Method PUT -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo/1"

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

# description              id
# -----------              --
# Prepare bootcamp content 1

Invoke-RestMethod -Method DELETE -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo/1"

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/todo"

#
```

Web:

- Navigate to your website URL <http://serverless-final-todo-dev-websitebucket-abcdefghijklm.s3-website-ap-southeast-2.amazonaws.com/>
- Enter your `https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev`
  API URL in the top right
