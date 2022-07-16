export const getDateInMonthString = (_date) => {
    let [ , month, date ] = _date.split("T")[0].split('-')
    let [ hour, min ] = _date.split('T')[1].split(':')

    return `${Number(date)} ${getMonthFromMonthNumber(month)} ${Number(hour)}:${min}`
}

export const getFullDateTime = (_date) => {
    let [ year, month, date ] = _date.split("T")[0].split('-')
    let [ hour, min ] = _date.split('T')[1].split(':')

    return `${date}.${month}.${year} ${hour}:${min}`
}

export const getDate = (_date) => {
    let [ year, month, date ] = _date.split("T")[0].split('-')

    return `${date}:${month}:${year}`
}

export const getDateWithDash = (_date) => {
    let [ year, month, date ] = _date.split("T")[0].split('-')

    return `${date}-${month}-${year}`
}

const getMonthFromMonthNumber = (number) => {
    switch(Number(number)) {
        case 1: return "Yanvar";
        case 2: return "Fevral";
        case 3: return "Mart";
        case 4: return "Aprel";
        case 5: return "May";
        case 6: return "Iyun";
        case 7: return "Iyul";
        case 8: return "Avgust";
        case 9: return "Sentabr";
        case 10: return "Oktabr";
        case 11: return "Noyabr";
        case 12: return "Dekabr";
        default: throw new Error("Bunday oy yo'q")
    }
}