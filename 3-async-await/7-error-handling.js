// Error Handling
(async () => {
    const errorPromise = Promise.reject(new Error('hello from error'));
    try {
        await errorPromise;
    } catch (e) {
        console.log('error handling', e.message);
    } finally {
        console.log("I'll run no matter what");
    }
})();

(async () => {
    const errorPromise = Promise.reject(new Error('hello from error'));
    await errorPromise;
})().catch(e => console.log('catch the uncaught', e.message));
