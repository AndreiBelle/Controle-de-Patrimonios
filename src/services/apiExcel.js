const excelJS = require('exceljs')
const path = require('path')

let caminho = path.join("C:/Users/Andrei TI/Desktop/testeDeImportacao.xlsx")

async function ExcelService() {
    try{
        const workbook = new excelJS.Workbook(caminho);

        await workbook.xlsx.readFile(caminho);

        const worksheet = workbook.getWorksheet(1)

        worksheet.eachRow({ includeEmpty : false}, (row, rowNumber) => {
            if (rowNumber > 1) {
                const cuscus = row.getCell(1).value;
                const ModeloVeic = row.getCell(2).value;

                console.log(`Linha ${rowNumber}: Motorista: ${cuscus} | ModeloVeic ${ModeloVeic}`);
            }
        })
        
    } catch (err){
        console.log("Erro ao ler planilha: ", err)
    }
   
}

ExcelService();