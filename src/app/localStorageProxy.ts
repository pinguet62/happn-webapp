import 'reflect-metadata';

interface Converter<T> {
  toString: (it: T) => string;
  toType: (it: string) => T;
}

const StringConverter: Converter<string> = {
  toString: it => it,
  toType: it => it,
};
const NumberConverter: Converter<number> = {
  toString: it => it.toString(),
  toType: Number,
};

const converters: { [key: string]: Converter<any> } = {
  String: StringConverter,
  Number: NumberConverter,
};

export function LocalStorage(localStorageKey: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      get: () => {
        let value: any = window.localStorage.getItem(localStorageKey);
        value = converters[type.name].toType(value);
        return value;
      },
      set: value => {
        if (value === null) {
          localStorage.removeItem(localStorageKey);
        } else {
          value = converters[type.name].toString(value);
          localStorage.setItem(localStorageKey, value);
        }
      },
    });
  };
}
