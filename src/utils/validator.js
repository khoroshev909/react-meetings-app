export default function validator(formData, validateRules) {
    let isValid
    const errors = {}

    function validate(inputValue, ruleName, rule) {
        switch (ruleName) {
        case 'isRequired':
            isValid = typeof inputValue === 'string'
                ? inputValue !== ''
                : inputValue === true
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
        let inputValue
        if (typeof formData[fieldName] === 'string') {
            inputValue = formData[fieldName].trim()
        } else if (typeof formData[fieldName] === 'boolean') {
            inputValue = formData[fieldName]
        } else if (Array.isArray(formData[fieldName])) {
            inputValue = !!formData[fieldName].length
        } else {
            inputValue = 'Default val'
        }        
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