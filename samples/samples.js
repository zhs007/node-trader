"use strict";

const { alignCandles, roundingOffTime } = require('../index');
const fs = require('fs');
const moment = require('moment');

let lst = JSON.parse(fs.readFileSync('./samples/data001.json'));

let bt = roundingOffTime(new Date(lst[0].realtime), 'h', 20);
let et = roundingOffTime(new Date(lst[lst.length - 1].realtime), 'h', 40);

let nlst = alignCandles(lst, {
    realtime: 'realtime',
    ask_o: 'ask_o',
    ask_c: 'ask_c',
    ask_h: 'ask_h',
    ask_l: 'ask_l',
    bid_o: 'bid_o',
    bid_c: 'bid_c',
    bid_h: 'bid_h',
    bid_l: 'bid_l',
    volume: 'volume',
}, (timems) => {
    return timems + 60 * 1000;
}, bt.toISOString(), et.toISOString());

console.log(nlst);