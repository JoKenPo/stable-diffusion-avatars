export class StringBuilder {
  private _value: string[];

  constructor(initialValue: string = "") {
    this._value = [initialValue];
  }

  public append(str: string): StringBuilder {
    this._value.push(str);
    return this;
  }

  public toString(): string {
    return this._value.join("");
  }
}