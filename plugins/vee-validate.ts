import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

// with typescript
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: messages[rule],
  })
}
