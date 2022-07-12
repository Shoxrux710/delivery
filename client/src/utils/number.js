export const formatString = (str) => {
    const nstr = String(str)
    return nstr
        .split('')
        .reverse()
        .map((el, index) => 
            (index + 1)%3 === 0 
                ? " " + el
                : el
        )
        .reverse()
        .join("")
}