import * as React from 'react'

export interface ITableProps {
  columns?: Array<string | React.ReactNode>
  dataColumns: Array<string>
  data: Array<{[key: string]: string | React.ReactNode}>
  isLoading?: boolean
}

export class Table extends React.Component<ITableProps> {
  public render() {
    const { isLoading, data, dataColumns } = this.props
    if (isLoading) { return <div>Loading...</div> }

    return (
      <table style={{ width: '100%', maxWidth: 920 }}>
          <tbody>
            {data.map((row, rowIdx) => {
              if (typeof row === 'object') {
                const rowString = row as { [key: string]: any }
                return (
                  <tr key={rowString.id || rowIdx}>
                    {dataColumns.map((column) => {
                      const value = column.includes('.') ? rowString[column.split('.')[0]][column.split('.')[1]] : rowString[column]
                      if (value && typeof value !== 'object') {
                        return <td key={column}>{value}</td>
                      } else {
                        console.log('value', value)
                        return value
                      }
                    })}
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
    )
  }
}
