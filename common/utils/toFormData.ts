type FormDataValue = string | Blob

const arrayOfObjectsToFormData = (
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
    formData.append(`${key}`, '')

    return
  }

  array.forEach(
    (item: FormDataValue | [string, FormDataValue], index: number) => {
      if (typeof item === 'object' && !(item instanceof Blob)) {
        // Handle nested object
        arrayOfObjectsToFormData(formData, item, index, key)

        return
      }

      // Handle non-object array
      formData.append(`${key}[${index}]`, item)
    }
  )
}

const toFormData = (object: object): FormData => {
  const formData = new FormData()

  Object.entries(object).forEach(
    ([key, value]: [string, FormDataValue | [string, FormDataValue][]]) => {
      if (Array.isArray(value)) {
        arrayToFormData(formData, value, key)

        return
      }

      formData.append(key, value)
    }
  )

  return formData
}

export default toFormData
