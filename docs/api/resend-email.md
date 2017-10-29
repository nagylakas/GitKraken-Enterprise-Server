# `/api/resend-email`

Resend activation link

## Method

`POST`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#32
- `app/src/js/actions/RegistrationActions.js`#703

## Request Headers

- `Content-Type:application/json`

## Request body (example)

```json
{
  "id": "a6bb0af0-4dd0-4cfe-acf4-75097ae6a95b"
}
```

## Request (example) via `curl`

```bash
curl -X POST -H "Content-Type:application/json" -d "{\"id\":\"a6bb0af0-4dd0-4cfe-acf4-75097ae6a95b\"}" api.gitkraken.com/resend-email
```

## Response

Success or failure status
