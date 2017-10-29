# `/api/user`

## Method

`GET`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#34
- `app/src/js/redux/domain/Registration/RegistrationSelectors.js`#134
- `app/src/js/actions/RegistrationActions.js`#203

## Request headers

- `Authorization: Bearer token`

## Response on error (example)

Status code from `300` to `400`

## Response (example)

`json` file

```json
{
  "email" : "user@example.com",
  "name" : "user",
  "id": "a11ed9ed-d19f-47fa-af30-88469c9bd68e",
  "licenseExpiresAt" : "1970-01-01",
  "licensedFeatures" : [],
  "status" : "activated"
}
```
