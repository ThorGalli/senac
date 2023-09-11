import GenericModel from "./abstract/GenericModel";
import Lesson from "./Lesson";

export default class Unit extends GenericModel {
  lessons: Lesson[] = [];
  private _active: boolean = false;

  constructor(id: number, name: string) {
    super(id, name);
  }
}
