"use strict";

const { alignCandles } = require('./lib/candles');
const { roundingDownTime, roundingUpTime, roundingOffTime } = require('./lib/time');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
//options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// funcOff(strdatetime) return new strdatetime
// [st, et)
exports.alignCandles = alignCandles;

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
