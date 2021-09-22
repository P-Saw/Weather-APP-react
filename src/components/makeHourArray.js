export function makeHourArray(hour) {
  let array = [`${hour}:00`];
  for (let i = 0; i < 12; i++) {
    if (hour === 23) {
      hour = -1;
    } else if (hour === 24) {
      hour = 0;
    }
    hour += 2;
    array.push(`${hour}:00`);
  }
  return array;
}
