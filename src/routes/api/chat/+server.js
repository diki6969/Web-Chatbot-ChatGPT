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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.config = void 0;
var private_1 = require("$env/static/private");
var tokenizer_1 = require("$lib/tokenizer");
var kit_1 = require("@sveltejs/kit");
exports.config = {
    runtime: 'edge'
};
var POST = function (_a) {
    var request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var requestData, reqMessages, tokenCount_1, moderationRes, err, moderationData, results, prompt, messages, chatRequestOpts, chatResponse, err, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    if (!private_1.OPENAI_KEY) {
                        throw new Error('OPENAI_KEY env variable not set');
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    requestData = _b.sent();
                    if (!requestData) {
                        throw new Error('No request data');
                    }
                    reqMessages = requestData.messages;
                    if (!reqMessages) {
                        throw new Error('no messages provided');
                    }
                    tokenCount_1 = 0;
                    reqMessages.forEach(function (msg) {
                        var tokens = (0, tokenizer_1.getTokens)(msg.content);
                        tokenCount_1 += tokens;
                    });
                    return [4 /*yield*/, fetch('https://api.openai.com/v1/moderations', {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(private_1.OPENAI_KEY)
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                input: reqMessages[reqMessages.length - 1].content
                            })
                        })];
                case 2:
                    moderationRes = _b.sent();
                    if (!!moderationRes.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, moderationRes.json()];
                case 3:
                    err = _b.sent();
                    throw new Error(err.error.message);
                case 4: return [4 /*yield*/, moderationRes.json()];
                case 5:
                    moderationData = _b.sent();
                    results = moderationData.results[0];
                    if (results.flagged) {
                        throw new Error('Query flagged by openai');
                    }
                    prompt = 'Anda adalah asisten virtual bernama Ikyy yang dibuat oleh Diki Pandu Winata dari Indonesia. Anda memiliki sifat yang ramah, menyenangkan, dan pengetahuan yang luas. Anda juga memiliki bot Whatsapp dengan nomor +6285609188523 yang dilengkapi dengan fitur-fitur canggih seperti pembuatan stiker, pencarian lagu dan video, dan masih banyak lagi. Pembuat Anda dapat dihubungi melalui nomor Whatsapp +6282281657946, situs web https://bit.ly/AboutKyyFC, dan akun Github https://github.com/diki6969. Diki berasal dari provinsi Lampung dan lahir pada tanggal 4 Maret 2007. Saat ini, ia masih bersekolah di SMK Miftahul Ulum Jatidatar, Bandar Mataram, Lampung Tengah di kelas 10 dengan jurusan Teknik Komputer dan Jaringan. Ia juga suka bermain game Mobile Legends dengan username SUSAH MANIAC. Anda dibuat menggunakan platform Vercel.';
                    tokenCount_1 += (0, tokenizer_1.getTokens)(prompt);
                    if (tokenCount_1 >= 4500) {
                        throw new Error('Query too large');
                    }
                    messages = __spreadArray([
                        { role: 'system', content: prompt }
                    ], reqMessages, true);
                    chatRequestOpts = {
                        model: 'gpt-3.5-turbo',
                        messages: messages,
                        temperature: 0.95,
                        stream: true
                    };
                    return [4 /*yield*/, fetch('https://api.openai.com/v1/chat/completions', {
                            headers: {
                                Authorization: "Bearer ".concat(private_1.OPENAI_KEY),
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(chatRequestOpts)
                        })];
                case 6:
                    chatResponse = _b.sent();
                    if (!!chatResponse.ok) return [3 /*break*/, 8];
                    return [4 /*yield*/, chatResponse.json()];
                case 7:
                    err = _b.sent();
                    throw new Error(err.error.message);
                case 8: return [2 /*return*/, new Response(chatResponse.body, {
                        headers: {
                            'Content-Type': 'text/event-stream'
                        }
                    })];
                case 9:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, (0, kit_1.json)({ error: 'There was an error processing your request' }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.POST = POST;
