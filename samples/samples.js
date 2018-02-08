"use strict";

const { alignCandles, roundingOffTime } = require('../index');
const fs = require('fs');
const moment = require('moment');

let lst = JSON.parse(fs.readFileSync('./samples/data001.json'));

let sbbt = '2018-01-01T05:00:00Z';
let sbet = '2018-01-02T05:00:00Z';

let bt = roundingOffTime(new Date(lst[0].realtime), 'h', 20);
let et = roundingOffTime(new Date(lst[lst.length - 1].realtime), 'h', 40);

let bbt = new Date(sbbt);
let bet = new Date(sbet);

if (bt.getTime() < bbt.getTime()) {
    bt = bbt;
}

if (et.getTime() > bet.getTime()) {
    et = bet;
}

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