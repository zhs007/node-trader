"use strict";

const {
    alignCandles,
    scaleCandles
} = require('./lib/candles');

const {
    alignCandles2
} = require('./lib/candles2');

const {
    buildCandles2
} = require('./lib/deals2candles2');

const {
    roundingDownTime,
    roundingUpTime,
    roundingOffTime,
    addTime
} = require('./lib/time');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
//options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// funcOff(strdatetime) return new strdatetime
// [st, et)
exports.alignCandles = alignCandles;

// lst is align candles
// options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// srctime is like 1
// srctimetype is like 'm'
// desttime is like 4
// desttimetype is like 'h'
exports.scaleCandles = scaleCandles;

// timetype is like y,M,d,h,m,s
// if jsdate is 2018-02-08 01:00:00 & timetype is d
//  then return 2018-02-08
exports.roundingDownTime = roundingDownTime;

// timetype is like y,M,d,h,m,s
// if jsdate is 2018-02-08 23:00:00 & timetype is d
//  then return 2018-02-09
exports.roundingUpTime = roundingUpTime;

// timetype is like y,M,d,h,m,s
// if >rounding then +1
// if jsdate is 2018-02-08 12:00:00 & timetype is d & rounding is 11
//  then return 2018-02-09
exports.roundingOffTime = roundingOffTime;

// timevalue is like 4
// time type is like 'h'
// return jsdate
exports.addTime = addTime;

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
// options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, op, cp, hp, lp, volume}
// funcOff(timems) return new timems
// [st, et]
exports.alignCandles2 = alignCandles2;

// dealsoptions {tsms, price, volume, askprice, askvolume, bidprice, bidvolume}
// candlesoptions {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, op, cp, hp, lp, volume}
// [st, et]
exports.buildCandles2 = buildCandles2;
