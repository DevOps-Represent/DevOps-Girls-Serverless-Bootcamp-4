# Troubleshooting

## API

Open in browser:

```plaintext
https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/xxxxx/todos
```

---

```json
{
  "message": "Missing Authentication Token"
}
```

This path is not handled by the API. Make sure it ends with `/{{stage}}/todos`.

---

```plaintext
Blank page + 404 response code
```

This path is not handled by the API. Make sure it ends with `/{{stage}}/todos`.

---

```json
{
  "error": "Error: I don't have a TABLE_NAME environment variable, so I don't know where to read and write your todos.",
  "message": "error handling request"
}
```

The Lambda function needs a `TABLE_NAME` environment variable to be set. This
is expected behaviour if you haven't created the DynamoDB table and wired it up
yet.

---

```json
{
  "error": "AccessDeniedException: User: arn:aws:sts::xxxxxxxxxxxx:assumed-role/serverless-final-todo-dev-ap-southeast-2-lambdaRole/serverless-final-todo-api-dev is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:ap-southeast-2:xxxxxxxxxxxx:table/serverless-final-todo-dev-DatabaseTable-XXXXXXXXXXXXX",
  "message": "error handling request"
}
```

The Lambda function does not have permission to communicate with the DynamoDB
table.

First, check that the table name in the error message is what you expect. If
not, the `TABLE_NAME` environment variable is probably set with the wrong value.

Next, check that the Lambda function was given appropriate IAM permissions:

- Click-ops: ensure that a role was selected during Lambda function creation.
  You might need to re-create the Lambda function and API Gateway if it wasn't,
  or manually add a policy statement to the role.
- Serverless: ensure that `provider.iamRoleStatements` is configured correctly.
