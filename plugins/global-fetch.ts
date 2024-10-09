export default defineNuxtPlugin((nuxtApp) => {
    if (!globalThis.$fetch) {
        globalThis.$fetch = nuxtApp.$fetch;
    }
});
