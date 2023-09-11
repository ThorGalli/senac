import GenericModel from "./abstract/GenericModel";
import Subject from "./Subject";

export default class Lesson extends GenericModel {
  subjects: Subject[] = [];

  constructor(id: number, name: string) {
    super(id, name);
  }
}
