export function pmod(number, base) {
    if (base === 0) {
        return 0;
    }
    let tmp = number % base;
    tmp = tmp + base;
    return tmp % base;
}