import BasicObject from "./Abstracts/BasicObject";

export class Photo extends BasicObject {
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}
