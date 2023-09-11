import { Location2D } from "../../common/utils";
import { Image } from "../Image";
import { User } from "../User";
import PromptSync from "prompt-sync";

export abstract class Place {
  private _name: string;
  private _location: Location2D;
  private _background: Image;
  protected prompt = PromptSync();

  constructor(name: string, location: Location2D, background: Image) {
    this._name = name;
    this._location = location;
    this._background = background;
  }

  public get name(): string {
    return this._name;
  }

  public get location(): Location2D {
    return this._location;
  }

  public get background(): Image {
    return this._background;
  }

  public abstract Interact(user: User): void;
}
