---
layout: ../layouts/MarkdownLayout.astro
title: curl
---

# Basics of curl

`curl` is a command-line tool for transferring data over HTTP and other protocols.

## Basic Usage

```bash
curl https://example.com
```

Download a page and print its response to the terminal.

## Save a Response

```bash
curl -o page.html https://example.com
```

Or use the URL's filename:

```bash
curl -O https://example.com/page.html
```

## Follow Redirects

```bash
curl -L https://example.com
```

## Show Response Headers

```bash
curl -I https://example.com
```

Show headers and response body:

```bash
curl -i https://example.com
```

## Make a GET Request

GET is the default:

```bash
curl https://api.example.com/users
```

Add query parameters:

```bash
curl "https://api.example.com/users?page=2&limit=10"
```

## Make a POST Request

```bash
curl -X POST https://api.example.com/users
```

Send form data:

```bash
curl -X POST \
  -d "name=Marvin" \
  -d "age=25" \
  https://api.example.com/users
```

## Send JSON

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Marvin"}' \
  https://api.example.com/users
```

## HTTP Methods

```bash
curl -X GET https://example.com
curl -X POST https://example.com
curl -X PUT https://example.com
curl -X PATCH https://example.com
curl -X DELETE https://example.com
```

## Headers

Add a request header:

```bash
curl -H "Accept: application/json" https://api.example.com
```

Multiple headers:

```bash
curl \
  -H "Accept: application/json" \
  -H "Authorization: Bearer TOKEN" \
  https://api.example.com
```

## Authentication

Basic authentication:

```bash
curl -u username:password https://example.com
```

Bearer token:

```bash
curl \
  -H "Authorization: Bearer TOKEN" \
  https://api.example.com
```

## Download Files

```bash
curl -O https://example.com/file.zip
```

Choose the output filename:

```bash
curl -o myfile.zip https://example.com/file.zip
```

## Upload a File

```bash
curl -F "file=@photo.jpg" https://example.com/upload
```

## Send Data From a File

```bash
curl -d @data.json https://example.com/api
```

For JSON:

```bash
curl \
  -H "Content-Type: application/json" \
  --data @data.json \
  https://example.com/api
```

## Inspect a Request

Verbose mode:

```bash
curl -v https://example.com
```

This shows details such as:

- DNS connection
- TLS connection
- Request headers
- Response headers

## Check the HTTP Status

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://example.com
```

Example:

```text
200
```

Useful status codes:

| Code | Meaning            |
| ---- | ------------------ |
| 200  | OK                 |
| 201  | Created            |
| 301  | Permanent redirect |
| 302  | Temporary redirect |
| 400  | Bad request        |
| 401  | Unauthorized       |
| 403  | Forbidden          |
| 404  | Not found          |
| 500  | Server error       |

## Common Options

| Option | Purpose                        |
| ------ | ------------------------------ |
| `-o`   | Save output to a file          |
| `-O`   | Save using the remote filename |
| `-L`   | Follow redirects               |
| `-I`   | Request headers only           |
| `-i`   | Include response headers       |
| `-v`   | Verbose output                 |
| `-H`   | Add a header                   |
| `-d`   | Send request data              |
| `-X`   | Specify HTTP method            |
| `-u`   | Basic authentication           |
| `-F`   | Send multipart form data       |
| `-s`   | Silent mode                    |

## Useful Examples

Download a file:

```bash
curl -LO https://example.com/file.tar.gz
```

Pretty-print JSON with `jq`:

```bash
curl https://api.example.com/users | jq
```

Test an API endpoint:

```bash
curl -i https://api.example.com/health
```

POST JSON:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}' \
  https://api.example.com/messages
```

## curl vs wget

Both can download files, but they are commonly used differently:

- `curl` — excellent for HTTP requests and APIs.
- `wget` — focused more heavily on downloading files and recursively mirroring websites.

For API work, `curl` is particularly useful.

## Help

```bash
curl --help
```

More detailed help:

```bash
man curl
```
