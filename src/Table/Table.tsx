import * as React from 'react'
import styled from 'styled-components'

export interface ITableProps {
  columnGrids?: number[]
  columns: string[]
  headerData?: Array<string | React.ReactNode>
  headerAligns?: Array<'left' | 'center' | 'right'>
  bodyData: Array<{[key: string]: string | React.ReactNode}>
  bodyAligns?: Array<'left' | 'center' | 'right'>
  bodyFixedData?: Array<{[key: string]: string | React.ReactNode}>
  bodyFixedAligns?: Array<'left' | 'center' | 'right'>
  isLoading?: boolean
}

const StyledTable = styled.table`
  width: 100%;
  /* max-width: 920px; */
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
`

const StyledHead = styled.th`
  font-weight: normal;
  padding: 10px 8px;
  /* border-top: solid 1px #696969; */
  border-bottom: solid 1px #696969;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledRow = styled.tr`
  position: relative;
  /* height: 37px; */
  /* line-height: 37px; */
  background: #fff;
  border-bottom: solid 1px #e1e1e1;
  &:hover {
    background: #fafafa;
  }
`

const StyledColumn = styled.td`
  padding: 8px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// const Styl

export class Table extends React.Component<ITableProps> {
  public render() {
    const { isLoading, headerAligns, headerData, bodyData, bodyAligns, columns, columnGrids } = this.props
    if (isLoading && bodyData.length === 0) { return <div>Loading...</div> }

    return (
      <>
      <StyledTable>
          {headerData && <thead>
            <tr>
              {headerData.map((header, idx) => {
                const width = columnGrids && (840 / 12) * columnGrids[idx]
                const style = width ? { width } : {}
                //  textAlign={headerAligns ? headerAligns[idx] : 'left'}
                return (
                  <th key={idx} style={style}>
                    {header}
                  </th>
                )
              })}
            </tr>
          </thead>}
          <tbody>
            {bodyData.map((row, rowIdx) => {
              if (typeof row === 'object') {
                const rowString = row as { [key: string]: any }
                return (
                  <StyledRow key={rowString.id || rowIdx}>
                    {columns.map((column, idx) => {
                      const value = column.includes('.') ? rowString[column.split('.')[0]][column.split('.')[1]] : rowString[column]
                      if (value !== undefined) {
                        const width = columnGrids && (840 / 12) * columnGrids[idx]
                        const style = width ? { width } : {}
                        // textAlign={bodyAligns ? bodyAligns[idx] : 'left'}
                        return (<td
                          key={column}

                          style={style}
                        >
                          {value}
                        </td>)
                      }
                    })}
                  </StyledRow>
                )
              }
            })}
          </tbody>
        </StyledTable>
        </>
    )
  }
}
