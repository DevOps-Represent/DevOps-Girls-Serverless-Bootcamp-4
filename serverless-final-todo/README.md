# Serverless Final TODO

Complete template for a Serverless API and backing database. You may compare
your solution to this example after you're done, or use it as a reference if you
get stuck.

DISCLAIMER: for ease of use, the API has CORS fully enabled. You probably
wouldn't have such a configuration on an actual production system.

## Create stack

```shell
serverless create --template-url https://github.com/DevOps-Girls/DevOps-Girls-Bootcamp-4/tree/master/serverless-final-todo

# Serverless: Generating boilerplate...
# Serverless: Downloading and installing "serverless-final-todo"...
# Serverless: Successfully installed "serverless-final-todo"

cd serverless-final-todo
```

## Deploy stack

```shell
serverless deploy --region ap-southeast-2 --stage dev

# Service Information
# service: serverless-final-todo
# stage: dev
# region: ap-southeast-2
# stack: serverless-final-todo-dev
# api keys:
#   None
# endpoints:
#   DELETE - https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/{id}
#   GET - https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/
#   PUT - https://1234567890.execute-api.ap-southeast-2.amazonaws.com/dev/{id}
# functions:
#   deleteTodo: serverless-final-todo-dev-deleteTodo
#   readTodos: serverless-final-todo-dev-readTodos
#   writeTodo: serverless-final-todo-dev-writeTodo
```

## Test API

macOS and Linux (sh):

```shell
subdomain='1234567890'

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

# []

curl --data 'Prepare bootcamp content' --request PUT "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/1"

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

# [{"description":"Prepare bootcamp content","id":"1"}]

curl --request DELETE "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/1"

curl --request GET "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

# []
```

Windows (PowerShell):

```powershell
$subdomain='1234567890'

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

#

Invoke-RestMethod -Body 'Prepare bootcamp content' -Method PUT -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/1"

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

# description              id
# -----------              --
# Prepare bootcamp content 1

Invoke-RestMethod -Method DELETE -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/1"

Invoke-RestMethod -Method GET -Uri "https://$subdomain.execute-api.ap-southeast-2.amazonaws.com/dev/"

#
```
