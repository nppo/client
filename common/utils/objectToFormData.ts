type FormDataValue = string | Blob

const nestedObjectToFromData = (
  formData: FormData,
  object: [string, FormDataValue],
  index: number,
  key: string
): void => {
  Object.entries(object).forEach(([itemKey, itemValue]) =>
    formData.append(`${key}[${index}][${itemKey}]`, itemValue)
  )
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
      formData.append(`${key}[${index}]`, item)
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

      formData.append(key, value)
    }
  )

  return formData
}
