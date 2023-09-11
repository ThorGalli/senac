import GenericModel from "./abstract/GenericModel";
import Unit from "./Unit";

export default class Course extends GenericModel {
  units: Unit[] = [];

  constructor(id: number, name: string) {
    super(id, name);
  }
}
