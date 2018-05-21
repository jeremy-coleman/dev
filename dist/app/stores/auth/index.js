"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./Auth");
const mobx_persist_1 = require("mobx-persist");
const auth = new Auth_1.Auth();
exports.default = auth;
const hydrate = mobx_persist_1.create();
hydrate("auth", auth);
