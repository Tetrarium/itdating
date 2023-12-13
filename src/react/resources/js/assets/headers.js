export const X_CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export const FORM_DATA_HEADER = {
    "Content-Type": "multipart/form-data",
    "X-CSRF-TOKEN": X_CSRF_TOKEN,
};

export const APPLICATION_JSON_HEADER = {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": X_CSRF_TOKEN,
};
