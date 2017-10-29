# `/api/oauth/token`

Get auntification token

## Method

`POST`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#26
- `app/src/js/redux/domain/Registration/RegistrationSelectors.js`#122
- `app/src/js/actions/RegistrationActions.js`#381

## Request (headers)

- `Content-Type: application/x-www-form-urlencoded`

## Request body (example)

Variable        | Value
--------------- | ------------------
`grant_type`    | `password`
`username`      | `user@example.com`
`password`      | `qwerty`
`client_id`     | `CLIENT_ID`
`client_secret` | `CLIENT_SECRET`

## Response (example)

`json` file

```json
{
  "token_type": "bearer",
  "access_token": "token",
  "expires_in": 3600
}
```

## Response with using fields (example)

`json` file

```json
{
  "access_token": "token"
}
```

## Response on error (example)

Status `400` and `json` file

```json
{
  "name": "OAuth2Error",
  "message": "User credentials are invalid",
  "code": 400,
  "error": "invalid_grant",
  "error_description":"User credentials are invalid"
}
```
