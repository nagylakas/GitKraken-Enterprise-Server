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

const validator = require('validator');

const gitkraken = require(global.__gitkrakenEnterpriseServer);

const router = module.exports = require('express').Router();

router.use(gitkraken.middleware.auth);

router.post('/', async (req, res) => {
    if (req.user) {
        res.status(200).json({
            code: req.user.status === 'activated' ? 0 : req.user.status === 'pending' ? 2 : 1,
            licensedFeatures: req.user.features,
            licenseExpiresAt: req.user.expires
        });
        return;
    } else if (validator.isUUID(req.body.id)) {
        // language=PostgreSQL
        const user = (await gitkraken.db.query(`SELECT
                                                  status,
                                                  features,
                                                  expires
                                                FROM users
                                                WHERE uid = $1;`, [req.body.id])).rows[0];
        if (user) {
            res.status(200).json({
                code: user.status === 'activated' ? 0 : user.status === 'pending' ? 2 : 1,
                licensedFeatures: user.features,
                licenseExpiresAt: user.expires
            });
            return;
        }
    }
    res.status(400).json({
        code: 1
    });
});
