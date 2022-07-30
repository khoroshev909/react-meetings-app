export default function validator(formData, validateRules) {
    let isValid
    const errors = {}

    function validate(inputValue, ruleName, rule) {
        switch (ruleName) {
        case 'isRequired':
            isValid = inputValue !== ''
            break
        case 'isEmail': {
            const emailRegExp = /^\S+@\S+\.\S+$/g
            isValid = emailRegExp.test(inputValue)
            break
        }
        case 'hasCapital': {
            const capitalRegExp = /[A-Z]+/g
            isValid = capitalRegExp.test(inputValue)
            break
        }
        case 'hasDigit': {
            const digitRegExp = /\d+/g
            isValid = digitRegExp.test(inputValue)
            break
        }
        case 'minLength': {
            isValid = inputValue.length >= rule.value
            break
        }
        default:
            break
        }

        if (!isValid) return rule
    }

    Object.entries(validateRules).forEach(([fieldName, rules]) => {
        const inputValue = formData[fieldName].trim()
    
        Object.keys(rules).forEach((ruleName) => {
            const rule = rules[ruleName]
            const error = validate(inputValue, ruleName, rule)

            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        })
    })

    return errors
}