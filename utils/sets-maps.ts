export interface ISetPlus<T> {
  set: Set<T>;
  has: (args: T) => boolean;
  size: number;
  add: (args: T) => void;
  delete: (args: T) => void;
  clear: () => void;
  toArr: () => Array<T>;
  map: ((func: (args?: T) => any) => any) | ((func: (args?: T) => any) => void);
}

export function SetPlus<T>(arr: T[]): ISetPlus<T> {
  const set = new Set(arr);
  return {
    set: set,
    has: (args) => set.has(args),
    size: set.size,
    add: (args) => {
      set.add(args);
      arr.push(args);
    },
    delete: (agrs) => {
      set.delete(agrs);
      arr.splice(arr.indexOf(agrs), 1);
    },
    clear: () => {
      set.clear();
      arr.splice(0, Infinity);
    },
    toArr: () => Array.from(set),
    map: (func: () => any) => Array.from(set).map(func),
  };
}

export interface IMapPlus<K, V> {
  map: Map<K, V>;
  get: (args: K) => V | undefined;
  has: (args: K) => boolean;
  entries: IterableIterator<[K, V]>;
  keys: IterableIterator<K>;
  values: IterableIterator<V>;
  size: () => number;
  set: (key: K, value: V) => void;
  delete: (key: K) => boolean;
  clear: () => void;
  forEach: (funct: (value: V, key?: K, map?: Map<K, V>) => any) => void;
  toArr: () => [K, V][];
  toObj: () => Record<string, V>;
}

export function MapPlus<K, V>(keyVals: [key: K, value: V][]): IMapPlus<K, V> {
  const map = new Map(keyVals);
  return {
    map: map,
    get: (args) => map.get(args),
    has: (args) => map.has(args),
    entries: map.entries(),
    keys: map.keys(),
    values: map.values(),
    size: () => map.size,
    set: (key, value) => {
      map.set(key, value);
    },
    delete: (key) => map.delete(key),
    clear: () => {
      map.clear();
    },
    forEach: (funct) => {
      map.forEach(funct);
    },
    toArr: () => {
      const arr = new Array<[K, V]>();
      map.forEach((value, key) => {
        arr.push([key, value]);
      });
      return arr;
    },
    toObj: () => {
      const obj: { [key: string]: V } = {};
      map.forEach((value, key) => {
        obj[`${key}`] = value;
      });
      return obj;
    },
  };
}
