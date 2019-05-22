export default class Utils {
  //convert date from this format 05-02-2019 to 2019-02-05
  static ngbDateToDateFomatter(ngbDate):string {
    let startYear = ngbDate['year'];
    let startMonth = ngbDate['month'];
    let startDay  = ngbDate['day'];

    return startYear + "-" + startMonth + "-" + startDay;
}
 }
