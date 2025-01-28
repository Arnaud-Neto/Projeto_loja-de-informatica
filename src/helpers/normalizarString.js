
module.exports.normalizarString = function normalizarString(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").lowerCase();
}

module.exports.noInvalidChars = function noInvalidChars(string) {
    return "/[^a-zA-Z0-9!?-+=_]/g".test(string);
}