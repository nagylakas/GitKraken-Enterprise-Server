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

const gitkraken = require(global.__gitkrakenEnterpriseServer);

const router = module.exports = require('express').Router();

router.post('/', async (req, res) => {
    // language=PostgreSQL
    const user = (await gitkraken.db.query(`SELECT
                                              status,
                                              email
                                            FROM users
                                            WHERE uid = $1;`, [req.body.id])).rows[0];
    if (user && user.status === 'pending') {
        const email_token = uuid.v4();
        // language=PostgreSQL
        await gitkraken.db.query(`INSERT INTO tokens
        VALUES ($1, $2, NOW() + '1 DAY', 'email');`, [email_token, req.body.id]);
        await gitkraken.email.sendEmailActivation(req, user.email, email_token);
    }
    res.status(200).json({});
});
