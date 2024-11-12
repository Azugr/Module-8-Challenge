class Wheel {
  private _diameter: number;
  private _tireBrand: string;

  constructor(diameter: number = 15, tireBrand: string = 'Generic') {
    this._diameter = diameter;
    this._tireBrand = tireBrand;
  }

  // Getters to access private properties
  get diameter(): number {
    return this._diameter;
  }

  get tireBrand(): string {
    return this._tireBrand;
  }
}

export default Wheel;
