const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote
} = require('./identify')

const tokenize = input => {
  const tokens = []
  let cursor = 0

  while (cursor < input.length) {
    const character = input[cursor]

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character
      })
      cursor++
      continue
    }

    // Ignore all whitespace
    if (isWhitespace(character)) {
      cursor++
      continue
    }

    if (isNumber(character)) {
      let number = ''

      while (isNumber(input[cursor])) {
        number += input[cursor]
        cursor++
      }

      tokens.push({
        type: 'Number',
        value: parseInt(number, 10)
      })

      continue
    }

    throw new Error(`${character} is not valid!`)
  }

  return tokens
}

module.exports = { tokenize }
