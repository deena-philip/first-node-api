//@ts-check
const excelToJsonConverter = require('convert-excel-to-json')
const EXCEL_FILE = './sample_codes.xlsx'

function parseExcel() {
    const jsonResult = excelToJsonConverter({ sourceFile: EXCEL_FILE })
    // console.log(JSON.stringify(jsonResult))
    const sheet1Rows = jsonResult['Sheet1']
    var rowIndex
    var skip = true
    let codeArray = []
    // console.log(sheet1Rows)
    for (rowIndex in sheet1Rows) {
        let row = sheet1Rows[rowIndex]
        if (row['A'] === 'Code') {
            skip = false
            continue
        } else if (skip) {
            continue
        }
        codeArray.push({ code: row['A'], link: row['C'], redeemedStatus: row['C'] === 'redeemed' })
    }
    console.log(codeArray)
}

parseExcel()