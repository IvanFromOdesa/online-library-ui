export const beautifyText = (words) => {
    words = words.map((word) => (
        word.replaceAll('_', ' ')
    ))
    return words.map((word) => (
        word = word.charAt(0) + word.substring(1).toLowerCase()
    ))
}