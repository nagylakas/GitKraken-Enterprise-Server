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

const nodemailer = require('nodemailer');

const transport = exports.transport = nodemailer.createTransport({
    pool: true,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmailActivation = (req, to, token) => {
    return new Promise((resolve, reject) => {
        const activationLink = `${req.protocol}://${req.get('host')}/api/activate/${token}?email=${encodeURIComponent(to)}`;
        transport.sendMail({
            from: `"GitKraken Enterprise Server" ${process.env.EMAIL_USER}`,
            to: to,
            subject: "GitKraken — Verify your email!",
            text: `Follow the link ${activationLink} to activate your email!`,
            html: `Follow the <a href=${activationLink}>link</a> to activate your email!`
        }, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};

exports.sendPasswordReset = (req, to, token) => {
    return new Promise((resolve, reject) => {
        const resetLink = `${req.protocol}://${req.get('host')}/request_reset/${token}?email=${encodeURIComponent(to)}`;
        transport.sendMail({
            from: `"GitKraken Enterprise Server" ${process.env.EMAIL_USER}`,
            to: to,
            subject: "GitKraken — Reset your password!",
            text: `Follow the link ${resetLink} to reset your password!`,
            html: `Follow the <a href=${resetLink}>link</a> to reset your password!`
        }, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
