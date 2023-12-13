export function objectToFormData(object) {
    const formData = new FormData();

    for (let key in object) {
        formData.append(key, object[key]);
    }

    return formData;
}