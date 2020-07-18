export function getRandomAngle(min: number, max: number) {
    const degToRad = 0.017453292519943295;
    return getRandomInt(min, max) * degToRad;
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
