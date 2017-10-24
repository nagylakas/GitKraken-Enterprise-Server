# GitKraken Enterprise Server

![logo](https://www.gitkraken.com/img/enterprise/behind-firewall.svg)

Full weight free and open source realization of GitKraken's Enterprise Server

If you need `GitKraken Enterprise` go to <https://github.com/KillWolfVlad/GitKraken-Pro-AUR> and read `README`

## Hot to use?

Execute `node bin\gitkraken-enterprise-server.js` with environment

Environment variable + value                                 | Description
------------------------------------------------------------ | -------------------------------------
`PORT=3000`                                                  | `http` server port
`GITKRAKEN_RELEASE_PROXY=yes`                                | Activate proxy mode for releases
`GITKRAKEN_RELEASE_DIR=/var/gitraken/release`                | Path to GitKraken's release directory
`NODE_TLS_REJECT_UNAUTHORIZED=0`                             | Disable check `ssl` certificate
`DATABASE_URL=postgresql://dbuser:password@server:5432/mydb` | DataBase url
`DATABASE_DISABLE_SSL=true`                                  | Disable DataBase `ssl` mode

### Heroku

- Create `heroku` app
- Add [`postgres`](https://elements.heroku.com/addons/heroku-postgresql) as addon
- Push to `heroku`
- Optional: set `GITKRAKEN_RELEASE_PROXY=yes` environment

## Try our server now!

- For `master` branch

```
https://gitkraken-enterprise.herokuapp.com
```

- For `develop` branch

```
https://staging-gitkraken-enterprise.herokuapp.com/
```

> Warning! Our heroku server use free account, due to which its performance may not meet your expectations!

> Warning! We don't store information about you, don't track you and etc.

> Warning! We can drop data base at any time! Don't use our free servers in serious business!

## Comparison table

Field                                 | Our realization                          | Axosoft realization
------------------------------------- | ---------------------------------------- | ----------------------------------
Support GitKraken Enterprise v3.1.2   | :recycle:                                | :white_check_mark:
Open source                           | :white_check_mark:                       | :negative_squared_cross_mark:
Pricing                               | Unlimited users absolutely free, forever | :dollar: for every user every year
Support                               | GitHub Issues                            | Guaranteed email support
For use behind a firewall             | :recycle:                                | :white_check_mark:
Deploy to `Heroku`                    | :white_check_mark:                       | :negative_squared_cross_mark:
Installation via `npm`                | :recycle:                                | :negative_squared_cross_mark:
Installed on your servers (`docker`)  | :recycle:                                | :white_check_mark:
Installed on your servers (`linux`)   | :recycle:                                | :negative_squared_cross_mark:
Installed on your servers (`windows`) | :recycle:                                | :negative_squared_cross_mark:
Installed on your servers (`macOS`)   | :recycle:                                | :negative_squared_cross_mark:
Local account management              | :recycle:                                | :white_check_mark:
Full IT control over releases         | :recycle:                                | :white_check_mark:

> :recycle: - this feature is currently only being developed!

## API status

Path                                                                          | Status
----------------------------------------------------------------------------- | ------------------
[/api/ping](docs/api/ping.md)                                                 | :white_check_mark:
[/release/linux/RELEASES](docs/release/linux/RELEASES.md)                     | :white_check_mark:
[/release/darwin/RELEASES](docs/release/darwin/RELEASES.md)                   | :white_check_mark:
[/release/win32/RELEASES](docs/release/win32/RELEASES.md)                     | :white_check_mark:
[/release/win64/RELEASES](docs/release/win64/RELEASES.md)                     | :white_check_mark:
[/api/user/password/check-strength](docs/api/user/password/check-strength.md) | :white_check_mark:
