// StringFunctions.ts

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  const str = String(this);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export {};
