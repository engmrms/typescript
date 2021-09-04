 
export function AutoBind(
    target: any,
    methodName: string,
    decseptor: PropertyDescriptor
  ) {
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
 