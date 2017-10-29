# `/api/user/password/check-strength`

Check password strength

## Method

`POST`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#24
- `app/src/js/actions/RegistrationActions.js`#325

## Request Headers

- `Content-Type:application/json`

## Request body (example)

`json` file

```json
{
  "password": "qwerty"
}
```

## Request (example) via `curl`

```bash
curl -X POST -H "Content-Type:application/json" -d "{\"password\":\"qwerty\"}" api.gitkraken.com/user/password/check-strength
```

## Response (example)

`json` file

```json
{
  "feedback": {
    "warning": "This is a top-10 common password",
    "suggestions": ["Add another word or two. Uncommon words are better."]
  },
  "score": 0,
  "minimumLength": 6,
  "minimumScore": 1,
  "recommendedScore": 3
}
```
