"use strict";

const { addTime } = require('./time');

// lst is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:02:00']
// output is like ['YYYY-MM-DD 11:00:00', 'YYYY-MM_DD 11:01:00', 'YYYY-MM_DD 11:02:00']
// options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// funcOff(timems) return new timems
// [st, et]
function alignCandles(lst, options, funcOff, st, et) {
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

                cn[options.volume] = 0;

                nlst.push(cn);
            }
        }

        mst = mnt;
    }

    return nlst;
}

// lst is align candles
// options {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, volume}
// srctime is like 1
// srctimetype is like 'm'
// desttime is like 4
// desttimetype is like 'h'
function scaleCandles(lst, options, srctime, srctimetype, desttime, desttimetype) {
    let nlst = [];

    let cn = lst[0];
    let mst = new Date(cn[options.realtime]);
    let nst = addTime(mst, desttime, desttimetype);
    let nstms = nst.getTime();

    let snn = {};
    ncn[options.realtime] = mst.toISOString();
    ncn[options.ask_o] = cn[options.ask_o];
    ncn[options.ask_c] = cn[options.ask_c];
    ncn[options.ask_h] = cn[options.ask_h];
    ncn[options.ask_l] = cn[options.ask_l];
    ncn[options.bid_o] = cn[options.bid_o];
    ncn[options.bid_c] = cn[options.bid_c];
    ncn[options.bid_h] = cn[options.bid_h];
    ncn[options.bid_l] = cn[options.bid_l];
    ncn[options.volume] = cn[options.volume];

    nlst.push(snn);

    let cnn = {};
    cnn[options.realtime] = nst.toISOString();
    cnn[options.ask_o] = -1;
    cnn[options.ask_c] = -1;
    cnn[options.ask_h] = -1;
    cnn[options.ask_l] = -1;
    cnn[options.bid_o] = -1;
    cnn[options.bid_c] = -1;
    cnn[options.bid_h] = -1;
    cnn[options.bid_l] = -1;
    cnn[options.volume] = 0;

    nlst.push(cnn);

    for (let i = 1; i < lst.length; ++i) {
        let ccn = lst[i];
        // let nct = addTime(mst, srctime, srctimetype);
        // let nctms = nct.getTime();
        let ct = new Date(ccn[options.realtime]);
        let ctms = ct.getTime();

        if (nstms >= ctms) {
            if (cnn[options.ask_o] == -1) {
                cnn[options.ask_o] = ccn[options.ask_o];
            }

            cnn[options.ask_c] = ccn[options.ask_c];

            if (cnn[options.ask_h] == -1 || cnn[options.ask_h] < ccn[options.ask_h]) {
                cnn[options.ask_h] = ccn[options.ask_h];
            }

            if (cnn[options.ask_l] == -1 || cnn[options.ask_l] > ccn[options.ask_l]) {
                cnn[options.ask_l] = ccn[options.ask_l];
            }

            if (cnn[options.bid_o] == -1) {
                cnn[options.bid_o] = ccn[options.bid_o];
            }

            cnn[options.bid_c] = ccn[options.bid_c];

            if (cnn[options.bid_h] == -1 || cnn[options.bid_h] < ccn[options.bid_h]) {
                cnn[options.bid_h] = ccn[options.bid_h];
            }

            if (cnn[options.bid_l] == -1 || cnn[options.bid_l] > ccn[options.bid_l]) {
                cnn[options.bid_l] = ccn[options.bid_l];
            }

            cnn[options.volume] += ccn[options.volume];
        }

        if (nstms == ctms) {
            nst = addTime(nst, desttime, desttimetype);
            nstms = nst.getTime();

            cnn = {};
            cnn[options.realtime] = nst.toISOString();
            cnn[options.ask_o] = -1;
            cnn[options.ask_c] = -1;
            cnn[options.ask_h] = -1;
            cnn[options.ask_l] = -1;
            cnn[options.bid_o] = -1;
            cnn[options.bid_c] = -1;
            cnn[options.bid_h] = -1;
            cnn[options.bid_l] = -1;
            cnn[options.volume] = 0;

            nlst.push(cnn);
        }
    }

    return nlst;
}

exports.alignCandles = alignCandles;
exports.scaleCandles = scaleCandles;