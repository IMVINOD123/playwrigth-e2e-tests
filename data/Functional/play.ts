import  fs  from 'fs';
import  path  from "path";
//const fs=require("fs")
//const path=require("path")
import { parse } from 'csv-parse/sync';


// Read the file with Native 'FS' module

const csvFilePath = path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`);
// const csvDataFile = fs.readFileSync(csvFilePath, { encoding: "utf-8" })
// console.log(csvDataFile)
// console.log("Data Type of CSV File Data:" + typeof csvDataFile)

// // Parse the CSV data In to Array form
// const csvDataArr = parse(csvDataFile, {
//   trim: true,
//   skip_empty_lines: true,
//   columns: true
// });

//console.log(csvDataArr)
// Print the arrays of data which is converted into array formate
// csvDataArr.forEach((row, index) => {
//   console.log(row);
// });

// Reusable method for multiple class
function readCSV(filepath:string):any
{
  const csvDataFile = fs.readFileSync(csvFilePath, { encoding: "utf-8" })
// Parse the CSV data In to Array form
const csvDataArr = parse(csvDataFile, {
  trim: true,
  skip_empty_lines: true,
  columns: true
});

return csvDataArr;

}

//unit testr
// const filepath= path.resolve(`${process.cwd()}/data/Functional/make-aptment-test-data.csv`);
// const resultSet=readCSV(filepath)
// console.log(resultSet)
// console.log(resultSet[0].testid)

//export default csvDataArr;

