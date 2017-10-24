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

const chalk = require('chalk');
const program = require('commander');

const pkgJson = require('../package.json');

program
    .version(pkgJson.version)
    .description(pkgJson.description)
    .parse(process.argv);

const gitkraken = require('../src');

gitkraken.app.listen(process.env.PORT, () => {
    console.log(`${chalk.bold.underline.greenBright('GitKraken Enterprise Server')} listen on port ${chalk.greenBright(process.env.PORT)}!`)
});

(async () => {
    try {
        await gitkraken.db.connect();
        console.log(`${chalk.bold.underline.greenBright('GitKraken Enterprise Server')} connect to data base!`);
    }
    catch (error) {
        console.error(`${chalk.bold.underline.greenBright('GitKraken Enterprise Server')} can't connect to data base!`);
        console.error(error);
        process.exit(1);
    }
})();
