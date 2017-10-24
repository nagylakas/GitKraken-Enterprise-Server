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

const fetch = require('node-fetch');

const router = module.exports = require('express').Router();

router.get('/:os/:file', async (req, res) => {
    let fetchRes = await fetch(`https://release.gitkraken.com/${req.params.os}/${req.params.file}`);
    res.set('content-type', fetchRes.headers.get('content-type'));
    res.set('content-length', fetchRes.headers.get('content-length'));
    res.status(200).end(await fetchRes.buffer());
});
