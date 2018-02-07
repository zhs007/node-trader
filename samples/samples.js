"use strict";

const { alignCandles } = require('../index');
const fs = require('fs');
const moment = require('moment');

let lst = JSON.parse(fs.readFileSync('./samples/data001.json'));

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
}, (st) => {
    return moment(st).add(1, 'm').format();
}, '2018-01-01T22:00:00Z', '2018-01-02T05:00:00Z');

console.log(nlst);