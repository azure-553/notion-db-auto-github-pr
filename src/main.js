"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@notionhq/client");
var dotenv = require("dotenv");
dotenv.config();
var notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
var databaseId = process.env.NOTION_DATABASE_ID;
function fetchNotionData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!databaseId) {
                        throw new Error("Missing NOTION_DATABASE_ID environment variable");
                    }
                    return [4 /*yield*/, notion.databases.query({
                            database_id: databaseId,
                        })];
                case 1:
                    response = _a.sent();
                    response.results.forEach(function (result) {
                        if ("properties" in result) {
                            var page = result;
                            console.log("Page ID:", page.id);
                            Object.entries(page.properties).forEach(function (_a) {
                                var _b, _c;
                                var key = _a[0], value = _a[1];
                                switch (value.type) {
                                    case "title":
                                        console.log("".concat(key, ": ") +
                                            value.title.map(function (item) { return item.plain_text; }).join(" "));
                                        break;
                                    case "rich_text":
                                        console.log("".concat(key, ":: ") +
                                            value.rich_text.map(function (item) { return item.plain_text; }).join(" "));
                                        break;
                                    case "date":
                                        console.log("".concat(key, ": ") + ((_b = value.date) === null || _b === void 0 ? void 0 : _b.start));
                                        break;
                                    case "number":
                                        console.log("".concat(key, ": ") + value.number);
                                        break;
                                    case "select":
                                        console.log("".concat(key, ": ") + ((_c = value.select) === null || _c === void 0 ? void 0 : _c.name));
                                        break;
                                    case "multi_select":
                                        console.log("".concat(key, ": ") +
                                            value.multi_select.map(function (item) { return item.name; }).join(", "));
                                        break;
                                    case "checkbox":
                                        console.log("".concat(key, ": ") + value.checkbox);
                                        break;
                                    case "url":
                                        console.log("".concat(key, ": ") + value.url);
                                        break;
                                    case "email":
                                        console.log("".concat(key, ": ") + value.email);
                                        break;
                                    case "phone_number":
                                        console.log("".concat(key, ": ") + value.phone_number);
                                        break;
                                    default:
                                        console.log("".concat(key, ": ") + value.type);
                                }
                            });
                        }
                        else {
                            console.log("Result is not a full page object:", result);
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("[ERROR] Notion Database의 Data를 불러오는데 실패했습니다.", error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
fetchNotionData();
