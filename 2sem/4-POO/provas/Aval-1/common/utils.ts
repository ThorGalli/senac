import { Place } from "../Entities/abstract/Place";

export type Location2D = { x: number; y: number };

export interface MoveableObject {
  currentPlace: Place;
}

export function RandomInt(min: number, max: number) {
  const randomNumber = Math.round(min + Math.random() * max);
  return randomNumber;
}

export function calculateDistance(startPoint: Location2D, endPoint: Location2D) {
  const distance = Math.sqrt(
    Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
  );
  return distance;
}

export function calculateTravelTime(distance: number, speed: number) {
  const timeInSeconds = (distance * 3600) / speed;
  return timeInSeconds;
}
