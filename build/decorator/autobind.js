export function AutoBind(target, methodName, decseptor) {
    const originalMethod = decseptor.value;
    const adjDescreptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bounded = originalMethod.bind(this);
            return bounded;
        },
    };
    return adjDescreptor;
}
//# sourceMappingURL=autobind.js.map