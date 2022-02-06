
export class PublicGoogleSheetsParser {

    spreadsheetId: string;

    constructor (spreadsheetId:string) {
      this.spreadsheetId = spreadsheetId
    }
  
    getSpreadsheetDataUsingFetch () {
      // Read data from the first sheet of the target document.
      // It cannot be used unless everyone has been given read permission.
      // It must be a spreadsheet document with a header, as in the example document below.
      // spreadsheet document for example: https://docs.google.com/spreadsheets/d/10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps/edit#gid=1719755213
      if (!this.spreadsheetId) return null
      let url = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?`
  
      return fetch(url)
        .then((r) => r && r.ok && r.text ? r.text() : null)
        .catch((_) => null)
    }
  
    normalizeRow (rows:any[]) {
      return rows.map((row) => (row && (row.v !== null && row.v !== undefined)) ? row : {})
    }
  
    applyHeaderIntoRows (header:string[], rows:any[]) {
      return rows
        .map(({ c: row }) => this.normalizeRow(row))
        .map((row) => row.reduce((p, c, i) => c.v ? Object.assign(p, { [header[i]]: c.v }) : p, {}))
    }
  
    getItems (spreadsheetResponse:string) {
      let rows = []
  
      try {
        const parsedJSON = JSON.parse(spreadsheetResponse.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''))
        const hasSomeLabelPropertyInCols = parsedJSON.table.cols.some(({ label }:any) => !!label)
        if (hasSomeLabelPropertyInCols) {
          const header = parsedJSON.table.cols.map(({ label }:any) => label)
          rows = this.applyHeaderIntoRows(header, parsedJSON.table.rows)
        } else {
          const [headerRow, ...originalRows] = parsedJSON.table.rows
          const header = this.normalizeRow(headerRow.c).map((row) => row.v)
  
          rows = this.applyHeaderIntoRows(header, originalRows)
        }
      } catch (e) {}
  
      return rows
    }
  
    async parse () {
  
      if (!this.spreadsheetId) throw new Error('SpreadsheetId is required.')
  
      const spreadsheetResponse = await this.getSpreadsheetDataUsingFetch()
  
      if (spreadsheetResponse === null) return []
  
      return this.getItems(spreadsheetResponse)
    }
  }
  