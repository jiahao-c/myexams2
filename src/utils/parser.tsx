export function parseDateTime(datetimeStr: string) {
    //datetimeStr original format "15-Dec-2021 at 2:00 PM"
    datetimeStr = datetimeStr.replace(" at ", " ");
    datetimeStr += " EST";
    return new Date(datetimeStr);
  }