export type Location = { x: number; y: number; z: number };
export enum Status {
  STATIONARY = 0,
  TRAVELING = 1,
}

export function calculateDistance(startPoint: Location, endPoint: Location) {
  const distance = Math.sqrt(
    Math.pow(endPoint.x - startPoint.x, 2) +
      Math.pow(endPoint.y - startPoint.y, 2) +
      Math.pow(endPoint.z - startPoint.z, 2)
  );
  return distance;
}

export function calculateTravelTime(distance: number, speed: number) {
  const timeInSeconds = (distance * 3600) / speed;
  return timeInSeconds;
}
