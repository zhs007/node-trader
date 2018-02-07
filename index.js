"use strict";

const { alignCandles } = require('./lib/candles');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
//options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// funcOff(strdatetime) return new strdatetime
// [st, et)
exports.alignCandles = alignCandles;
