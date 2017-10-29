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

const gitkraken = require(global.__gitkrakenEnterpriseServer);

const router = module.exports = require('express').Router();

router.use(gitkraken.middleware.auth);

router.get('/', (req, res) => {
    if (req.user)
        res.status(200).json({
            email: req.user.email,
            name: req.user.name,
            id: req.user.uid,
            licenseExpiresAt: req.user.expires,
            licensedFeatures: req.user.features,
            status: req.user.status
        });
    else
        res.status(400).json({});
});
