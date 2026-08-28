---
layout: ../layouts/MarkdownLayout.astro
title: Postman
---

# Basics of Postman

## What is Postman?

Postman is a tool for **testing and working with APIs**.

You can use it to:

- Send HTTP requests
- Inspect responses
- Test API endpoints
- Add headers and authentication
- Send JSON data
- Save requests into collections
- Write automated API tests

---

## 1. HTTP Request Basics

An API request usually has:

```text
METHOD URL
```

Common HTTP methods:

| Method   | Purpose             |
| -------- | ------------------- |
| `GET`    | Get data            |
| `POST`   | Create/send data    |
| `PUT`    | Replace data        |
| `PATCH`  | Update part of data |
| `DELETE` | Delete data         |

Example:

```http
GET https://api.example.com/users
```

---

## 2. Creating a Request

In Postman:

1. Create a new request.
2. Select the HTTP method.
3. Enter the URL.
4. Add headers, parameters, or a body if needed.
5. Click **Send**.

Example:

```http
GET http://localhost:3000/users
```

---

## 3. Query Parameters

Query parameters are added to the URL:

```http
GET /users?page=2&limit=10
```

In Postman, use the **Params** tab:

```text
Key      Value
page     2
limit    10
```

Postman generates:

```text
? page=2&limit=10
```

without the space:

```text
?page=2&limit=10
```

---

## 4. Headers

Headers provide additional information about the request.

Example:

```http
Content-Type: application/json
Authorization: Bearer TOKEN
```

In Postman:

```text
Headers
┌─────────────────┬──────────────────┐
│ Key             │ Value            │
├─────────────────┼──────────────────┤
│ Content-Type    │ application/json │
│ Authorization   │ Bearer TOKEN      │
└─────────────────┴──────────────────┘
```

Common headers:

```text
Content-Type
Accept
Authorization
User-Agent
```

---

## 5. Request Body

`POST`, `PUT`, and `PATCH` requests often send data.

Example JSON:

```json
{
  "name": "Marvin",
  "age": 25
}
```

In Postman:

```text
Body
  → raw
  → JSON
```

Then enter the JSON.

Usually you also need:

```http
Content-Type: application/json
```

---

## 6. Reading the Response

After clicking **Send**, Postman shows the response.

Example:

```http
HTTP/1.1 200 OK
```

```json
{
  "id": 1,
  "name": "Marvin"
}
```

Important response information:

- Status code
- Response body
- Response headers
- Response time
- Response size

---

## 7. Important Status Codes

```text
200 OK
201 Created
204 No Content

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict

500 Internal Server Error
```

Think:

```text
2xx → success
4xx → client/request problem
5xx → server problem
```

---

## 8. POST Example

Suppose your API has:

```http
POST http://localhost:3000/users
```

Body:

```json
{
  "name": "Marvin",
  "email": "marvin@example.com"
}
```

The server might respond:

```http
201 Created
```

```json
{
  "id": 42,
  "name": "Marvin",
  "email": "marvin@example.com"
}
```

---

## 9. Authentication

APIs commonly require authentication.

For example:

```http
Authorization: Bearer abc123
```

Postman has an **Authorization** tab where you can select authentication types such as:

```text
Bearer Token
Basic Auth
API Key
OAuth 2.0
```

For a bearer token, Postman generates:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 10. Collections

A **collection** is a group of saved requests.

Example:

```text
My API
├── Users
│   ├── Get Users
│   ├── Get User
│   ├── Create User
│   └── Delete User
│
└── Auth
    ├── Login
    └── Logout
```

Collections are useful for organizing and repeatedly testing an API.

---

## 11. Variables

Postman variables let you avoid repeating values.

Instead of:

```text
http://localhost:3000
```

use:

```text
{{baseUrl}}
```

Set:

```text
baseUrl = http://localhost:3000
```

Then:

```http
GET {{baseUrl}}/users
```

This makes it easy to switch environments:

```text
Development:
http://localhost:3000

Production:
https://api.example.com
```

---

## 12. Environments

An environment is a collection of variables.

Example:

```text
Development
    baseUrl = http://localhost:3000
    token = dev-token

Production
    baseUrl = https://api.example.com
    token = production-token
```

Then requests can use:

```http
{{baseUrl}}/users
```

---

## 13. Cookies

APIs can use cookies for sessions.

Example:

```http
Cookie: session=abc123
```

Postman has a cookie manager where you can inspect and manage cookies.

This is useful when testing APIs that use browser-style sessions.

---

## 14. Testing Responses

Postman can run JavaScript tests against responses.

Example:

```javascript
pm.test("Status is 200", function () {
  pm.response.to.have.status(200);
});
```

Check JSON:

```javascript
pm.test("Response has a name", function () {
  const data = pm.response.json();

  pm.expect(data).to.have.property("name");
});
```

---

## 15. Typical API Workflow

When developing a backend:

```text
Build endpoint
     ↓
Start server
     ↓
Open Postman
     ↓
Create request
     ↓
Send request
     ↓
Inspect response
     ↓
Fix backend
     ↓
Send again
```

Example:

```http
POST /users
```

Send:

```json
{
  "name": "Alice"
}
```

Check:

```text
Status: 201
```

Check response:

```json
{
  "id": 1,
  "name": "Alice"
}
```

---

## 16. Postman vs Browser

A browser is mainly designed to **display web pages**.

Postman is designed to **work with APIs**.

Browser:

```text
GET /users
        ↓
HTML page
        ↓
Rendered UI
```

Postman:

```text
GET /users
        ↓
HTTP response
        ↓
JSON
```

Postman also makes it much easier to:

- Send `POST` requests
- Set custom headers
- Send JSON bodies
- Test authentication
- Save requests
- Run API tests

---

## 17. Postman vs curl

The same request can often be made with either tool.

Postman:

```text
GET http://localhost:3000/users
```

curl:

```bash
curl http://localhost:3000/users
```

Postman provides a graphical interface.

`curl` is a command-line tool.

Both ultimately send HTTP requests.

---

## 18. Basic Things to Learn First

Focus on these first:

```text
HTTP methods
     ↓
URLs
     ↓
Query parameters
     ↓
Headers
     ↓
JSON bodies
     ↓
Status codes
     ↓
Authentication
     ↓
Variables
     ↓
Collections
     ↓
Tests
```

These are the core Postman concepts you'll use when developing and testing backend APIs.
