type FormDataValue = string | Blob

const appendToFromData = (
  formData: FormData,
  key: string,
  value: FormDataValue
): void => {
  if (value === null) {
    value = ''
  }

  formData.append(key, value)
}

const nestedObjectToFromData = (
  formData: FormData,
  object: [string, FormDataValue],
  index: number,
  key: string
): void => {
  Object.entries(object).forEach(([itemKey, itemValue]) => {
    if (itemValue === null) {
      itemValue = ''
    }

    appendToFromData(formData, `${key}[${index}][${itemKey}]`, itemValue)
  })
}

const arrayToFormData = (
  formData: FormData,
  array: FormDataValue[] | [string, FormDataValue][],
  key: string
): void => {
  if (array.length === 0) {
    // Send empty value when array is empty
    return formData.append(`${key}`, '')
  }

  array.forEach(
    (item: FormDataValue | [string, FormDataValue], index: number) => {
      if (typeof item === 'object' && !(item instanceof Blob)) {
        // Handle nested object
        return nestedObjectToFromData(formData, item, index, key)
      }

      // Handle non-object array
      appendToFromData(formData, `${key}[${index}]`, item)
    }
  )
}

export default function objectToFormData(
  object: object,
  formData = new FormData()
): FormData {
  Object.entries(object).forEach(
    ([key, value]: [string, FormDataValue | [string, FormDataValue][]]) => {
      if (Array.isArray(value)) {
        return arrayToFormData(formData, value, key)
      }

      appendToFromData(formData, key, value)
    }
  )

  return formData
}
