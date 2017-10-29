# `/api/phone-home`

Get user information from data base

## Method

`POST`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#28
- `app/src/js/actions/RegistrationActions.js`#296

## About `code`

Code | Status
---- | -----------
`0`  | `activated`
`1`  | `logout`
`2`  | `pending`

## Request headers (optional + example)

- `Authorization: Bearer token`

## Request Headers (for body)

- `Content-Type:application/json`

## Request body with using fields (optional + example)

`json` file

```json
{
  "id" : "a6bb0af0-4dd0-4cfe-acf4-75097ae6a95b"
}
```

## Response with using fields (example)

```json
{
  "code" : 0,
  "licensedFeatures" : [],
  "licenseExpiresAt": "1970-01-01"
}
```
