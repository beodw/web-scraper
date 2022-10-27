// returns specified period in milliseconds
function getDurationInMilliseconds({ milliSeconds, seconds, minutes, hours }) {
  let period = milliSeconds ?? seconds ?? minutes ?? hours;
  switch (period) {
    case seconds:
      return seconds * 1000;
    case minutes:
      return minutes * 1000 * 60;
    case hours:
      return hours * 1000 * 60 * 60;
    case milliSeconds:
      return milliSeconds;
    default:
      throw new Error("Time period to wait must be spcified.");
  }
}

export default getDurationInMilliseconds;
