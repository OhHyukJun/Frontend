export function _fnCompareDay(vValue1: string, vValue2: string) {
  var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; //Declare Regex

  if (vValue1.length > 7 && vValue2.length > 7) {
    //- replaceAll
    const dtArray1 = vValue1.replace(/-/gi, "").match(rxDatePattern); //기준 날짜
    const dtArray2 = vValue2.replace(/-/gi, "").match(rxDatePattern); //비교 날짜

    //0 => 현재 날짜 / 1 => yyyy / 2 => mm / 3 => dd

    if (dtArray1 === null || dtArray2 === null) return "N";

    var vSDate = new Date(
      parseInt(dtArray1[1]),
      parseInt(dtArray1[2]) + 1,
      parseInt(dtArray1[3])
    );
    var vEDate = new Date(
      parseInt(dtArray2[1]),
      parseInt(dtArray2[2]) + 1,
      parseInt(dtArray2[3])
    );

    var vGapDay = Math.abs(vEDate.getTime() - vSDate.getTime());
    vGapDay = Math.ceil(vGapDay / (1000 * 3600 * 24));

    return vGapDay;
  } else {
    return "N";
  }
}

export const formatDate = (date: Date | null) => {
  console.log(date);
  if (!date) return "";
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  console.log(`${year}.${month}.${day}`);
  return `${year}-${month}-${day}`;
};
