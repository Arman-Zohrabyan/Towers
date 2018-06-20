/**
 * Created By: Arman Zohrabyan
 */


function onlyStatics(...mixins) {
  class Mix {}

  for (const mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  Object.getOwnPropertyNames(source).filter(key => {
    if (typeof source[key] === 'function' &&
        key !== 'constructor' &&
        key !== 'prototype' &&
        key !== 'name' &&
        key !== 'length') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  });
}


export default onlyStatics;
