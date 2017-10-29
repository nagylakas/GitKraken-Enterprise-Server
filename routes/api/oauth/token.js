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

const INVALID_CREDENTIALS = {
    name: "OAuth2Error",
    message: "User credentials are invalid",
    code: 400,
    error: "invalid_grant",
    error_description: "User credentials are invalid"
};

router.post('/', async (req, res) => {
    if (validator.isEmail(req.body.username))
        req.body.email = validator.normalizeEmail(req.body.username);
    else {
        res.status(400).json({INVALID_CREDENTIALS});
        return;
    }
    // language=PostgreSQL
    const user = (await gitkraken.db.query(`SELECT
                                              uid,
                                              password
                                            FROM users
                                            WHERE email = $1`, [req.body.email])).rows[0];
    if (!user) {
        res.status(400).json({INVALID_CREDENTIALS});
        return;
    }
    if (await gitkraken.password.checkHash(req.body.password, user.password)) {
        const auth_token = uuid.v4();
        // language=PostgreSQL
        await gitkraken.db.query(`INSERT INTO tokens
        VALUES ($1, $2, $3, 'auth')`, [auth_token, user.uid, gitkraken.date.APOCALYPSE]);
        res.status(200).json({
            access_token: auth_token
        });
    }
    else
        res.status(400).json(INVALID_CREDENTIALS);
});
