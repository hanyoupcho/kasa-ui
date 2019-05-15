import * as React from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon'

export interface IPaginationProps {
  currentPage: number
  numPages: number
  displayPages?: number
  onPageClick(payload: React.ReactNode): void
  onFirstPageClick(): void
  onLastPageClick(): void
  onNextPageClick(payload: React.ReactNode): void
  onPreviousPageClick(payload: React.ReactNode): void
}

const Wrapper = styled.div`
  position: relative;
  float: left;
  width: 100%;
  margin-top: 15px;
  height: 32px;
  text-align: center;
`

const NavButton = styled.a`
  display: inline-block;
  width: 32px;
  height: 28px;
  border: solid 1px #cccac9;
  margin-right: 5px;
  padding-top: 4px;

`
// /* background: url(../img/inc/page_r01.png) center no-repeat; */
const PageButton = styled.a`
  position: relative;
  top: -5px;
  font-size: 16px;
  line-height: 16px;
  display: inline;
  margin-right: 25px;
`


export const Pagination = (props: IPaginationProps) => {
  const { currentPage, numPages, displayPages = 10, onPageClick, onFirstPageClick, onLastPageClick, onPreviousPageClick, onNextPageClick } = props

  const fullPageSetCount = Math.floor(numPages / displayPages)

  const displayPageCount = (currentPage - 1) / displayPages

  const pageCount = fullPageSetCount > displayPageCount ? displayPages : numPages % displayPages

  const pageOffset = Math.floor((currentPage - 1) / displayPages) * displayPages

  return (
    <Wrapper>
      <span>
        <NavButton onClick={() => onFirstPageClick()}>
          <Icon name='firstPage'/>
        </NavButton>
        <NavButton style={{ marginRight: 25 }} onClick={currentPage > 1 ? () => onPreviousPageClick(currentPage - 2) : () => { return undefined }}>
          <Icon name='chevronLeft' />
        </NavButton>
      </span>
      {new Array(pageCount).fill(undefined).map((_, idx) => {
        const pageNumber = pageOffset + idx + 1
        // isActive={pageNumber === currentPage}
        return <PageButton key={pageNumber} onClick={() => onPageClick(pageNumber - 1)}>{pageNumber}</PageButton>
      })}
      <span>
        <NavButton onClick={currentPage < numPages ? () => onNextPageClick(currentPage) : () => { return undefined }}>
          <Icon name='chevronRight' />
        </NavButton>
        <NavButton onClick={() => onLastPageClick()}>
          <Icon name='lastPage' />
        </NavButton>
      </span>
    </Wrapper>
  )
}
