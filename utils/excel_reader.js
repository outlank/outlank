import fs from "fs";
import xlsx from "xlsx";

class ExcelReader {
  constructor(source) {
    this.source = source;
  }

  read() {
    let wb = xlsx.readFile("uploads/sn.xlsx");
    let ws = wb.SheetNames;
    console.log(ws);
  }
}

export default ExcelReader;

let er = new ExcelReader();
er.read();
