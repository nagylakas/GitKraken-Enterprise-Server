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

module.exports = async (req, res, next) => {
    const token = req.query.accessToken || req.get('Authorization').split(' ')[1];
    // language=PostgreSQL
    req.user = (await gitkraken.db.query(`SELECT
                                            users.uid,
                                            users.email,
                                            users.name,
                                            users.status,
                                            users.features,
                                            users.expires,
                                            users.admin,
                                            users.regdate
                                          FROM users, tokens
                                          WHERE
                                            users.uid = tokens.useruid AND tokens.token = $1 AND NOW() < tokens.expires
                                            AND tokens.expires IS NOT NULL AND
                                            tokens.scope = 'auth';`, [token])).rows[0];
    next();
};
