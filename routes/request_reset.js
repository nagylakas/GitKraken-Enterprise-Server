// GitKraken Enterprise Server
// Full weight free and open source realization of GitKraken's Enterprise Server
//
// Copyright (C) 2017  https://github.com/KillWolfVlad
//
// This file is part of GitKraken Enterprise Server
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

const uuid = require('uuid');
const validator = require('validator');

const gitkraken = require(global.__gitkrakenEnterpriseServer);

const router = module.exports = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).end(`
<form name="reset" method="post">
<label>Enter your email to get password reset link</label>
<br>
<input type="text" name="email">
<br>
<input type="submit">
</form>
`);
});

router.post('/', async (req, res) => {
    if (validator.isEmail(req.body.email)) {
        req.body.email = validator.normalizeEmail(req.body.email);
        // language=PostgreSQL
        const user = (await gitkraken.db.query(`SELECT uid
                                                FROM users
                                                WHERE email = $1;`, [req.body.email])).rows[0];
        if (user) {
            const password_token = uuid.v4();
            // language=PostgreSQL
            await gitkraken.db.query(`INSERT INTO tokens
            VALUES ($1, $2, NOW() + '1 DAY', 'password');`, [password_token, user.uid]);
            await gitkraken.email.sendPasswordReset(req, req.body.email, password_token);
        }
    }
    res.status(200).end('If you enter correct email, you should get password reset link!');
});

router.get('/:token', async (req, res) => {
    res.status(200).end(`<form name="reset" method="post">
<label>Enter new password to ${req.query.email}</label>
<br>
<input type="password" name="password">
<br>
<input type="submit">
</form>`);
});

router.post('/:token', async (req, res) => {
    const checkStrength = gitkraken.password.checkStrengthSync(req.body.password);
    if (checkStrength.score < checkStrength.minimumScore || req.body.password.length < checkStrength.minimumLength) {
        res.status(400).end('Insufficient password strength!');
        return;
    }
    // language=PostgreSQL
    const user = (await gitkraken.db.query(`SELECT useruid AS uid
                                            FROM tokens
                                            WHERE token = $1 AND NOW() < expires AND
                                                  expires IS NOT NULL AND
                                                  scope = 'password';`, [req.params.token])).rows[0];
    if (user) {
        // language=PostgreSQL
        await gitkraken.db.query(`UPDATE users
        SET password = $1
        WHERE uid = $2;`, [await gitkraken.password.generateHash(req.body.password), user.uid]);

        // language=PostgreSQL
        await gitkraken.db.query(`UPDATE tokens
        SET expires = NULL
        WHERE token = $1 AND scope = 'password';`, [req.params.token]);

        res.status(200).end('Your password has been reset!');
    }
    else
        res.status(400).end('Invalid token!');
});
