// Wheel class to represent a vehicle's wheel, including diameter and tire brand
class Wheel {
  private _diameter: number; // Private property to store the diameter of the wheel
  private _tireBrand: string; // Private property to store the tire brand of the wheel

  // Constructor with default values for diameter and tire brand
  constructor(diameter: number = 15, tireBrand: string = 'Generic') {
    this._diameter = diameter;
    this._tireBrand = tireBrand;
  }

  // Getter to access the diameter of the wheel
  get diameter(): number {
    return this._diameter;
  }

  // Getter to access the tire brand of the wheel
  get tireBrand(): string {
    return this._tireBrand;
  }
}

export default Wheel;
