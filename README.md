# GitKraken Enterprise Server

Full weight free, open source and the best realization of GitKraken's Enterprise Server

If you need `GitKraken Enterprise` go to <https://github.com/KillWolfVlad/GitKraken-Pro-AUR> and read `README`

## Hot to use?

Execute `node bin\gitkraken-enterprise-server.js` with environment

Environment variable + value                                 | Description
------------------------------------------------------------ | -------------------------------------
`PORT=3000`                                                  | `http` server port
`GITKRAKEN_PUBLIC_DIR=/var/gitraken/public`                  | Path to GitKraken's public directory
`GITKRAKEN_RELEASE_DIR=/var/gitraken/release`                | Path to GitKraken's release directory
`GITKRAKEN_RELEASE_PROXY=true`                               | Activate proxy mode for releases
`NODE_TLS_REJECT_UNAUTHORIZED=0`                             | Disable check `ssl` certificate
`DATABASE_DISABLE_SSL=true`                                  | Disable DataBase `ssl` mode
`DATABASE_URL=postgresql://dbuser:password@server:5432/mydb` | DataBase url
`EMAIL_HOST=smtp.example.com`                                | SMTP host to connection
`EMAIL_MESSAGE_SECURE=true`                                  | Send messages with secure links
`EMAIL_PASS=qwerty`                                          | SMTP user password
`EMAIL_PORT=465`                                             | SMTP port to connection
`EMAIL_SECURE=true`                                          | SMTP use secure?
`EMAIL_USER=noreplay@smtp.example.com`                       | SMTP user name

### Common requirements

- `nodejs` v8.8.1
- `npm` v5.5.1
- `PostgreSQL` v9.6.5
- Email server with SMTP support (see [nodemailer](https://www.npmjs.com/package/nodemailer) for more information)

### Heroku

- Create `heroku` app
- Add [`postgres`](https://elements.heroku.com/addons/heroku-postgresql) as addon
- Create or migrate DataBase from [db](./db) dirtory
- Set all `EMAIL_*` variables
- Optional: set `GITKRAKEN_RELEASE_PROXY=yes` variable
- Push to `heroku`

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

## Need help or you want help?

1. Open issue
2. Send PR
3. Or write me to [vk](https://vk.com/killwolfvlad)

## Comparison table

Field                                 | Our realization                          | Axosoft realization
------------------------------------- | ---------------------------------------- | ----------------------------------
Support `GitKraken Enterprise` v3.2.1 | :white_check_mark:                       | :white_check_mark:
Open source                           | :white_check_mark:                       | :negative_squared_cross_mark:
Pricing                               | Unlimited users absolutely free, forever | :dollar: for every user every year
Support                               | GitHub Issues                            | Guaranteed email support
For use behind a firewall             | :white_check_mark:                       | :white_check_mark:
Deploy to `Heroku`                    | :white_check_mark:                       | :negative_squared_cross_mark:
Installation via `npm`                | :grey_question:                          | :negative_squared_cross_mark:
Installed on your servers (`docker`)  | :question:                               | :white_check_mark:
Installed on your servers (`linux`)   | :question:                               | :negative_squared_cross_mark:
Installed on your servers (`windows`) | :question:                               | :negative_squared_cross_mark:
Installed on your servers (`macOS`)   | :question:                               | :negative_squared_cross_mark:
Local account management              | :recycle:                                | :white_check_mark:
Full IT control over releases         | :white_check_mark:                       | :white_check_mark:

> :recycle: - this feature is currently only being developed!

> :question: - this feature should work, but not tested!

> :grey_question: - this package will never publish to `npm`, but you can install it locally from `GitHub`

## API status

Path                                                                          | Status
----------------------------------------------------------------------------- | ------------------
[/](docs/root.md)                                                             | :white_check_mark:
[/api/activate](docs/api/activate.md)                                         | :white_check_mark:
[/api/oauth/token](docs/api/oauth/token.md)                                   | :white_check_mark:
[/api/phone-home](docs/api/phone-home.md)                                     | :white_check_mark:
[/api/ping](docs/api/ping.md)                                                 | :white_check_mark:
[/api/register](docs/api/register.md)                                         | :white_check_mark:
[/api/resend-email](docs/api/resend-email.md)                                 | :white_check_mark:
[/api/user/password/check-strength](docs/api/user/password/check-strength.md) | :white_check_mark:
[/api/user](docs/api/user.md)                                                 | :white_check_mark:
[/release/darwin/RELEASES](docs/release/darwin/RELEASES.md)                   | :white_check_mark:
[/release/linux/RELEASES](docs/release/linux/RELEASES.md)                     | :white_check_mark:
[/release/win32/RELEASES](docs/release/win32/RELEASES.md)                     | :white_check_mark:
[/release/win64/RELEASES](docs/release/win64/RELEASES.md)                     | :white_check_mark:
[/request_reset](docs/request_reset.md)                                       | :white_check_mark:

## Easter Eggs

- Story about mysterious `Chipotle button` <https://blog.axosoft.com/dev-room-confessions> (from `3` chapter)
- Open `fuzzy finder` (in `dev` mode) and type `Chris Right Now` and you can see [this](https://i.imgur.com/VQwjLKi.jpg) image

![logo](https://www.gitkraken.com/img/enterprise/behind-firewall.svg)
