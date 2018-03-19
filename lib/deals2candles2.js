"use strict";

// dealsoptions {tsms, price, volume, askprice, askvolume, bidprice, bidvolume}
// candlesoptions {realtime, ask_o, ask_c, ask_h, ask_l, bid_o, bid_c, bid_h, bid_l, op, cp, hp, lp, volume}
// [st, et)
function buildCandles2(lst, dealsoptions, candlesoptions, st, et) {
    if (lst == undefined || lst.length <= 0) {
        return [];
    }

    let sts = Math.floor(new Date(st).getTime() / 1000);
    let ets = Math.floor(new Date(et).getTime() / 1000);
    let nlst = [];
    let lasts = 0;
    let cn = undefined;

    for (let i = 0; i < lst.length; ++i) {
        let co = lst[i];
        let cts = Math.floor(co[dealsoptions.tsms] / 1000);
        if (cts < sts || cts >= ets) {
            continue;
        }

        if (cts > lasts) {
            cn = {};

            cn[candlesoptions.realtime] = new Date(cts * 1000).toISOString();

            cn[candlesoptions.ask_o] = co[dealsoptions.askprice];
            cn[candlesoptions.ask_c] = co[dealsoptions.askprice];
            cn[candlesoptions.ask_h] = co[dealsoptions.askprice];
            cn[candlesoptions.ask_l] = co[dealsoptions.askprice];

            cn[candlesoptions.bid_o] = co[dealsoptions.bidprice];
            cn[candlesoptions.bid_c] = co[dealsoptions.bidprice];
            cn[candlesoptions.bid_h] = co[dealsoptions.bidprice];
            cn[candlesoptions.bid_l] = co[dealsoptions.bidprice];

            cn[candlesoptions.op] = co[dealsoptions.price];
            cn[candlesoptions.cp] = co[dealsoptions.price];
            cn[candlesoptions.hp] = co[dealsoptions.price];
            cn[candlesoptions.lp] = co[dealsoptions.price];

            cn[candlesoptions.volume] = co[dealsoptions.volume];

            lasts = cts;

            nlst.push(cn);
        }
        else {
            cn[candlesoptions.ask_c] = co[dealsoptions.askprice];
            if (cn[candlesoptions.ask_h] < co[dealsoptions.askprice]) {
                cn[candlesoptions.ask_h] = co[dealsoptions.askprice];
            }
            if (cn[candlesoptions.ask_l] > co[dealsoptions.askprice]) {
                cn[candlesoptions.ask_l] = co[dealsoptions.askprice];
            }

            cn[candlesoptions.bid_c] = co[dealsoptions.bidprice];
            if (cn[candlesoptions.bid_h] < co[dealsoptions.bidprice]) {
                cn[candlesoptions.bid_h] = co[dealsoptions.bidprice];
            }
            if (cn[candlesoptions.bid_l] > co[dealsoptions.bidprice]) {
                cn[candlesoptions.bid_l] = co[dealsoptions.bidprice];
            }

            cn[candlesoptions.cp] = co[dealsoptions.price];
            if (cn[candlesoptions.hp] < co[dealsoptions.price]) {
                cn[candlesoptions.hp] = co[dealsoptions.price];
            }
            if (cn[candlesoptions.lp] > co[dealsoptions.price]) {
                cn[candlesoptions.lp] = co[dealsoptions.price];
            }

            cn[candlesoptions.volume] += co[dealsoptions.volume];
        }
    }

    return nlst;
}

exports.buildCandles2 = buildCandles2;