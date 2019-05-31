const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parse = tokens => {
  const token = pop(tokens);

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }

  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }

  if (isOpeningParenthesis(token.value)) {
    const expressionTokens = [];

    while (!isClosingParenthesis(peek(tokens).value)) {
      expressionTokens.push(parse(tokens));
    }

    const [identifier, ...args] = expressionTokens;

    return {
      type: 'CallExpression',
      name: identifier.name,
      arguments: args,
    };
  }
};

module.exports = { parse };
