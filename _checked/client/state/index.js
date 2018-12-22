"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("./ui");
exports.UiState = ui_1.UiState;
const nav_1 = require("./nav");
exports.NavState = nav_1.NavState;
const workspace_1 = require("./workspace");
exports.WorkspaceStorage = workspace_1.WorkspaceStorage;
exports.storageService = workspace_1.storageService;
const theme_1 = require("./theme");
exports.ThemeState = theme_1.ThemeState;
let GlobalState = {
    ui: new ui_1.UiState(),
    nav: new nav_1.NavState(),
    theme: new theme_1.ThemeState()
};
const state = { ...GlobalState };
exports.state = state;
exports.default = state;
