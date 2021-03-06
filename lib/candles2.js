"use strict";

const { addTime } = require('./time');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
// options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, op, cp, hp, lp, volume}
// funcOff(timems) return new timems
// [st, et]
function alignCandles2(lst, options, funcOff, st, et) {
    let nlst = [];

    let mst = new Date(st);
    let met = new Date(et);
    let lsti = 0;

    while (mst.getTime() <= met.getTime()) {
        let mnt = new Date(funcOff(mst.getTime()));

        if (lsti < lst.length) {
            let mct = new Date(lst[lsti][options.realtime]);

            if (mct.getTime() < mst.getTime()) {
                do {
                    ++lsti;
                    if (lsti >= lst.length) {
                        break ;
                    }

                    mct = new Date(lst[lsti][options.realtime]);
                } while (mct.getTime() < mst.getTime());
            }

            if (mct.getTime() > mst.getTime()) {
                if (lsti == 0) {
                    let cn = {};

                    cn[options.realtime] = mst.toISOString();
                    nlst.push(cn);
                }
                else {
                    let pn = lst[lsti - 1];
                    let cn = {};

                    cn[options.realtime] = mst.toISOString();

                    cn[options.ask_o] = pn[options.ask_h];
                    cn[options.ask_c] = pn[options.ask_h];
                    cn[options.ask_h] = pn[options.ask_h];
                    cn[options.ask_l] = pn[options.ask_h];

                    cn[options.bid_o] = pn[options.bid_l];
                    cn[options.bid_c] = pn[options.bid_l];
                    cn[options.bid_h] = pn[options.bid_l];
                    cn[options.bid_l] = pn[options.bid_l];

                    cn[options.op] = pn[options.cp];
                    cn[options.cp] = pn[options.cp];
                    cn[options.hp] = pn[options.cp];
                    cn[options.lp] = pn[options.cp];

                    cn[options.volume] = 0;

                    nlst.push(cn);
                }
            }
            else if (mct.getTime() == mst.getTime()) {
                nlst.push(lst[lsti]);

                ++lsti;
            }
        }
        else {
            if (lsti == 0) {
                let cn = {};

                cn[options.realtime] = mst.toISOString();
                nlst.push(cn);
            }
            else {
                let pn = lst[lsti - 1];
                let cn = {};

                cn[options.realtime] = mst.toISOString();

                cn[options.ask_o] = pn[options.ask_h];
                cn[options.ask_c] = pn[options.ask_h];
                cn[options.ask_h] = pn[options.ask_h];
                cn[options.ask_l] = pn[options.ask_h];

                cn[options.bid_o] = pn[options.bid_l];
                cn[options.bid_c] = pn[options.bid_l];
                cn[options.bid_h] = pn[options.bid_l];
                cn[options.bid_l] = pn[options.bid_l];

                cn[options.op] = pn[options.cp];
                cn[options.cp] = pn[options.cp];
                cn[options.hp] = pn[options.cp];
                cn[options.lp] = pn[options.cp];

                cn[options.volume] = 0;

                nlst.push(cn);
            }
        }

        mst = mnt;
    }

    return nlst;
}

exports.alignCandles2 = alignCandles2;