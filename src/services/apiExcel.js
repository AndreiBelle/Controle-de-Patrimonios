const ExcelJS = require('exceljs');

async function ExcelService(buffer) {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet(1);
        const dadosJson = [];

        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            
            if (row.hasValues) {
                const patrimonio = row.getCell(1).value;
                const situacao = row.getCell(2).value;
                const usuario = row.getCell(3).value;
                const setor = row.getCell(4).value;
                const local = row.getCell(5).value;
                const item = row.getCell(6).value;
                const marca = row.getCell(7).value;
                const modelo = row.getCell(8).value;
                const informacoes = row.getCell(9).value;
                const observacoes = row.getCell(10).value;


                dadosJson.push({
                    patrimonio: patrimonio,
                    situacao: situacao,
                    usuario: usuario,
                    setor: setor,
                    local: local,
                    item: item,
                    marca: marca,
                    modelo: modelo,
                    informacoes: informacoes,
                    observacoes: observacoes,
                });
            }
        }

        console.log("Total de linhas processadas:", dadosJson.length);
        return dadosJson;

    } catch (err) {
        console.error("Erro no ExcelService:", err);
        throw err; 
    }
}

module.exports = { ExcelService };