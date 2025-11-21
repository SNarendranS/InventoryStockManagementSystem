// /**
//  * Generic response mapper
//  * @param data - single object or array of objects
//  * @param keys - array of keys to pick from the object
//  */
// export function toResponse<T extends object, K extends keyof T>(
//   data: T | T[],
//   keys: K[]
// ): Pick<T, K> | Pick<T, K>[] {
//   const mapper = (item: T): Pick<T, K> => {
//     const result = {} as Pick<T, K>;
//     for (const key of keys) {
//       if (key in item) {
//         result[key] = item[key];
//       }
//     }
//     return result;
//   };

//   return Array.isArray(data) ? data.map(mapper) : mapper(data);
// }