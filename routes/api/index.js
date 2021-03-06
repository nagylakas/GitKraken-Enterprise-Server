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

const router = module.exports = require('express').Router();

router.use('/oauth', require('./oauth'));
router.use('/user', require('./user'));
router.use('/activate', require('./activate.js'));
router.use('/phone-home', require('./phone-home'));
router.use('/ping', require('./ping.js'));
router.use('/register', require('./register.js'));
router.use('/resend-email', require('./resend-email.js'));
