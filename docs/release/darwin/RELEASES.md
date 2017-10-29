# `/release/linux/RELEASES?v=0.0.0`

Update information for `macOS`

## Method

`GET`

## Files

- `app/src/appBootstrap/updateManager.js`#41

## Request (example)

`json` file with this content (if param `?v=0.0.0` does not exists or not actual)

```json
{"name":"0.0.0","url":"http://release.gitkraken.com/darwin/v0.0.0.zip"}
```

empty file (if param `?v=0.0.0` is up to date)
