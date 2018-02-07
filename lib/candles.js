"use strict";

const moment = require('moment');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
//options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// funcOff(strdatetime) return new strdatetime
// [st, et)
function alignCandles(lst, options, funcOff, st, et) {
    let nlst = [];

    let mst = moment(st);
    let met = moment(et);
    let lsti = 0;

    while (!mst.isSame(met)) {
        let mnt = moment(funcOff(mst.format()));

        if (lsti < lst.length) {
            let mct = moment(lst[lsti][options.realtime]);

            if (mct.isAfter(mst)) {
                if (lsti == 0) {
                    let cn = {};

                    cn[options.realtime] = mst.utc().format();
                    nlst.push(cn);
                }
                else {
                    let pn = lst[lsti - 1];
                    let cn = {};

                    cn[options.realtime] = mst.utc().format();

                    cn[options.ask_o] = pn[options.ask_h];
                    cn[options.ask_c] = pn[options.ask_h];
                    cn[options.ask_h] = pn[options.ask_h];
                    cn[options.ask_l] = pn[options.ask_h];

                    cn[options.bid_o] = pn[options.bid_l];
                    cn[options.bid_c] = pn[options.bid_l];
                    cn[options.bid_h] = pn[options.bid_l];
                    cn[options.bid_l] = pn[options.bid_l];

                    cn[options.volume] = 0;

                    nlst.push(cn);
                }
            }
            else if (mct.isBefore(mst)) {
                do {
                    ++lsti;
                    mct = moment(lst[lsti][options.realtime]);
                } while (mct.isBefore(mst));
            }

            if (mct.isSame(mst)) {
                nlst.push(lst[lsti]);

                ++lsti;
            }
        }

        mst = mnt;
    }

    return nlst;
}

exports.alignCandles = alignCandles;