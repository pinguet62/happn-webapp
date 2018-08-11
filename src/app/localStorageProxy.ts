export function LocalStorage(localStorageKey: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    Object.defineProperty(target, propertyKey, {
      get: () => window.localStorage.getItem(localStorageKey),
      set: value => {
        if (value === null) {
          localStorage.removeItem(localStorageKey);
        } else {
          localStorage.setItem(localStorageKey, value);
        }
      },
    });
  };
}
