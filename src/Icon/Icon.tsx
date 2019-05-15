import * as React from 'react'

// import chevronLeft from './assets/close.svg'
// import clsoe from './assets/close.svg'

const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>

const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>

const Close = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>

const FirstPage = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/><path fill="none" d="M24 24H0V0h24v24z"/></svg>

const LastPage = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>

type IconName = 'close' | 'chevronLeft' | 'chevronRight' | 'firstPage' | 'lastPage'

export interface IIconProps {
  name: IconName
}

export const Icon = (props: IIconProps) => {
  const { name } = props;

  const TargetIcon = {
    'chevronLeft': () => <ChevronLeft />,
    'chevronRight': () => <ChevronRight />,
    'close': () => <Close />,
    'firstPage': () => <FirstPage />,
    'lastPage': () => <LastPage />,
  }[name]

  return <TargetIcon />
}