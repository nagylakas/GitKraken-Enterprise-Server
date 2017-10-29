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

router.post('/', async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(400).json({
            message: "email appears to be invalid"
        });
        return;
    }
    req.body.email = validator.normalizeEmail(req.body.email);
    const checkStrength = gitkraken.password.checkStrengthSync(req.body.password);
    if (checkStrength.score < checkStrength.minimumScore || req.body.password.length < checkStrength.minimumLength) {
        checkStrength.message = "insufficient password strength";
        res.status(400).json(checkStrength);
        return;
    }
    // language=PostgreSQL
    const existsAccounts = await gitkraken.db.query('SELECT count(*) FROM users WHERE email = $1;', [req.body.email]);
    if (existsAccounts.rows[0].count !== '0') {
        res.status(400).json({
            message: "Account already exists"
        });
        return;
    }
    const userUid = uuid.v4();
    const email_token = uuid.v4();
    const auth_token = uuid.v4();
    // language=PostgreSQL
    const user =
        (await gitkraken.db.query(`INSERT INTO users
            VALUES ($1, $2, $3, $4, DEFAULT, '["enterprise"]', $5, DEFAULT, DEFAULT)
            RETURNING status, features, expires;`,
            [userUid, req.body.email, await gitkraken.password.generateHash(req.body.password), req.body.name, gitkraken.date.APOCALYPSE])).rows[0];
    // language=PostgreSQL
    await gitkraken.db.query(`INSERT INTO tokens
    VALUES ($1, $2, $3, 'auth'),
      ($4, $2, NOW() + '1 DAY', 'email')`, [auth_token, userUid, gitkraken.date.APOCALYPSE, email_token]);
    await gitkraken.email.sendEmailActivation(req, req.body.email, email_token);
    res.status(200).json({
        id: userUid,
        status: user.status,
        access_token: auth_token,
        licensedFeatures: user.features,
        licenseExpiresAt: user.expires
    });
});
