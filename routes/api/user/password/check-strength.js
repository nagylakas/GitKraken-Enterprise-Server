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

const zxcvbn = require('zxcvbn');

const router = module.exports = require('express').Router();

router.post('/', (req, res) => {
    const checkPasswordResult = zxcvbn(req.body.password);
    res.status(200).json({
        feedback: checkPasswordResult.feedback,
        score: checkPasswordResult.score,
        minimumLength: 6,
        minimumScore: 1,
        recommendedScore: 3
    });
});
