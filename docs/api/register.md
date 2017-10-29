# `/api/register`

Register new user

## Method

`POST`

## Files

- `app/src/js/redux/domain/App/AppConstants.js`#30
- `app/src/js/actions/RegistrationActions.js`#647

## About `app_id`

`app_id` is `sha1sum` of `mac` or `new uuid v4`

- `app/src/js/triggers/StartUpTrigger.js`#178

## About `id`

`id` (user) is simple `new uid v4`

## About `access_token`

`access_token` is `bearer` token

## About `licensedFeatures`

`licensedFeatures` is json array of features

Feature          | Description
---------------- | ------------------
`[]`             | no features
`['pro']`        | pro feature
`['enterprise']` | enterprise feature
`['trial']`      | trial feature

- `app/src/js/constants/RegistrationConstants.js`#58

## About `status`

`status` of email verification

- `pending`
- `activated`
- `unregistered`
- `registration_failed`

- `src/js/constants/RegistrationConstants.js`#71

## Request Headers

- `Content-Type:application/json`

## Request body (example)

```json
{
  "app_id": "64f4822b7e6db3b0309ba27accc936d1211b2b5e",
  "app_version": "0.0.0",
  "email": "admin@example.com",
  "eula_version": "0.0.0",
  "name": "admin",
  "password": "qwerty"
}
```

## Request with required fields body (example)

```json
{
  "email": "admin@example.com",
  "password": "qwerty"
}
```

## Request (example) via `curl`

```bash
curl -X POST -H "Content-Type:application/json" -d "{\"app_id\": \"64f4822b7e6db3b0309ba27accc936d1211b2b5e\",\"app_version\": \"0.0.0\",\"email\": \"admin@example.com\",\"eula_version\": \"0.0.0\",\"name\": \"admin\",\"password\": \"qwerty\"}" api.gitkraken.com/register
```

## Request with required fields (example) via `curl`

```bash
curl -X POST -H "Content-Type:application/json" -d "{\"email\": \"admin@example.com\",\"password\": \"qwerty\"}" api.gitkraken.com/register
```

## Response on error (example)

Status `400` and `json` file

```json
{
  "message": "Account already exists"
}
```

```json
{"message":"email appears to be invalid"}
```

```json
{"message":"insufficient password strength","feedback":{"warning":"","suggestions":["Add another word or two. Uncommon words are better."]},"score":0,"minimumLength":6,"minimumScore":1,"recommendedScore":3}
```

## Response (example)

`json` file if all ok

```json
{
  "id": "a11ed9ed-d19f-47fa-af30-88469c9bd68e",
  "status": "pending",
  "access_token": "db9e93a60d0415489494b32a06a535ba7e202db9",
  "licensedFeatures": [],
  "planCode": "gitkraken_free",
  "planName": "GitKraken"
}
```

`json file` with missing fields

```json
{
  "id": "a11ed9ed-d19f-47fa-af30-88469c9bd68e",
  "status": "pending",
  "access_token": "db9e93a60d0415489494b32a06a535ba7e202db9",
  "licensedFeatures": [],
  "licenseExpiresAt": "+275760-09-13T00:00:00.000Z",
  "planCode": "gitkraken_free",
  "planName": "GitKraken"
}
```

`json file` with using fields

```json
{
  "id": "a11ed9ed-d19f-47fa-af30-88469c9bd68e",
  "status": "pending",
  "access_token": "db9e93a60d0415489494b32a06a535ba7e202db9",
  "licensedFeatures": [],
  "licenseExpiresAt": "+275760-09-13T00:00:00.000Z"
}
```
