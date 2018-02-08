"use strict";

// const moment = require('moment');

// timetype is like y,M,d,h,m,s
// if jsdate is 2018-02-08 01:00:00 & timetype is d
//  then return 2018-02-08
function roundingDownTime(jsdate, timetype) {
    if (timetype == 'y') {
        return new Date(jsdate.getFullYear());
    }
    else if (timetype == 'M') {
        return new Date(jsdate.getFullYear(), jsdate.getMonth());
    }
    else if (timetype == 'd') {
        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate());
    }
    else if (timetype == 'h') {
        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours());
    }
    else if (timetype == 'm') {
        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes());
    }
    else if (timetype == 's') {
        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes(), jsdate.getSeconds());
    }

    return undefined;
}

// timetype is like y,M,d,h,m,s
// if jsdate is 2018-02-08 23:00:00 & timetype is d
//  then return 2018-02-09
function roundingUpTime(jsdate, timetype) {
    if (timetype == 'y') {
        return new Date(jsdate.getFullYear() + 1);
    }
    else if (timetype == 'M') {
        if (jsdate.getMonth() == 11) {
            return new Date(jsdate.getFullYear() + 1);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth() + 1);
    }
    else if (timetype == 'd') {
        return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate())).getTime() + 24 * 60 * 60 * 1000);
    }
    else if (timetype == 'h') {
        return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours())).getTime() + 60 * 60 * 1000);
    }
    else if (timetype == 'm') {
        return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes())).getTime() + 60 * 1000);
    }
    else if (timetype == 's') {
        return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes(), jsdate.getSeconds())).getTime() + 1000);
    }

    return undefined;
}

// timetype is like y,M,d,h,m,s
// if >rounding then +1
// if jsdate is 2018-02-08 12:00:00 & timetype is d & rounding is 11
//  then return 2018-02-09
function roundingOffTime(jsdate, timetype, rounding) {
    if (timetype == 'y') {
        if (jsdate.getMonth() > rounding) {
            return new Date(jsdate.getFullYear() + 1);
        }

        return new Date(jsdate.getFullYear());
    }
    else if (timetype == 'M') {
        if (jsdate.getDate() > rounding) {
            if (jsdate.getMonth() == 11) {
                return new Date(jsdate.getFullYear() + 1);
            }

            return new Date(jsdate.getFullYear(), jsdate.getMonth() + 1);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth());
    }
    else if (timetype == 'd') {
        if (jsdate.getHours() > rounding) {
            return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate())).getTime() + 24 * 60 * 60 * 1000);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate());
    }
    else if (timetype == 'h') {
        if (jsdate.getMinutes() > rounding) {
            return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours())).getTime() + 60 * 60 * 1000);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours());
    }
    else if (timetype == 'm') {
        if (jsdate.getSeconds() > rounding) {
            return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes())).getTime() + 60 * 1000);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes());
    }
    else if (timetype == 's') {
        if (jsdate.getTime() % 1000 > rounding) {
            return new Date((new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes(), jsdate.getSeconds())).getTime() + 1000);
        }

        return new Date(jsdate.getFullYear(), jsdate.getMonth(), jsdate.getDate(), jsdate.getHours(), jsdate.getMinutes(), jsdate.getSeconds());
    }

    return undefined;
}

exports.roundingDownTime = roundingDownTime;
exports.roundingUpTime = roundingUpTime;
exports.roundingOffTime = roundingOffTime;