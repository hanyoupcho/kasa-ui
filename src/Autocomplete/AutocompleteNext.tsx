import * as hangul from 'hangul-js'
import * as React from 'react'

import { Icon } from '../index'
import { ILabelProps, ISharedFormProps } from '../Shared/index'
import './Autocomplete.scss'

interface ISuggestion {
  label: string
  value: string
}

interface IProps extends ILabelProps, ISharedFormProps {
  suggestions: ISuggestion[]
}

interface IState {
  activeSuggestion: number
  filteredSuggestions: ISuggestion[]
  isMouseOver: boolean
  isUserInputMatch: boolean
  showSuggestions: boolean
  userInput: string
}

const SUGGESTION_LI_HEIGHT = 38

export class Autocomplete extends React.Component<IProps, IState> {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    isMouseOver: false,
    isUserInputMatch: false,
    showSuggestions: false,
    userInput: '',
  }

  private autocompletesRef = React.createRef<HTMLUListElement>()

  componentWillMount() {
    window.addEventListener('mousedown', this.onWindowMouseDown)
  }
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onWindowMouseDown)
  }
  componentDidUpdate() {
    const { suggestions } = this.props
    const { filteredSuggestions, userInput } = this.state
    if (!userInput && suggestions.length !== filteredSuggestions.length) {
      this.setState({
        filteredSuggestions: suggestions,
      })
    }
  }

  private fillFilteredSuggestions = (): void => {
    this.setState({
      filteredSuggestions: this.props.suggestions,
    })
  }

  private onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { userInput } = this.state
    const { suggestions } = this.props
    const filteredSuggestion = suggestions.filter((suggestion) => suggestion.label === userInput)[0]
    this.setState({
      activeSuggestion: filteredSuggestion ? suggestions.findIndex(suggestion => suggestion.label === userInput) : 0,
      filteredSuggestions: suggestions,
      isUserInputMatch: !!filteredSuggestion,
      showSuggestions: false,
      userInput: filteredSuggestion ? filteredSuggestion.label : '',
    })
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { suggestions } = this.props
    const userInput = e.currentTarget.value

    const filteredSuggestions = suggestions
      .filter(suggestion =>
        hangul.search(suggestion.label.toLocaleLowerCase(), userInput.toLocaleLowerCase())
         > -1
      )

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    })
  }

  private onInputFocus = (_: React.FocusEvent<HTMLInputElement>): void => {
    this.setState({ showSuggestions: true })
  }

  private onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { activeSuggestion, filteredSuggestions, userInput, showSuggestions } = this.state
    const { suggestions } = this.props

    switch (e.keyCode) {
      case 8: // delete
        if (showSuggestions) {
          if (suggestions.filter(suggestion => suggestion.label === userInput).length > 0) {
            e.preventDefault()
            this.setState({ userInput: '', filteredSuggestions: suggestions, isUserInputMatch: false })
          }
        } else {
          this.setState({ showSuggestions: true })
        }
        break
      case 38: // up arrow
        e.preventDefault()
        if (!showSuggestions) { return this.setState({ showSuggestions: true }) }
        if (activeSuggestion === 0) { return }

        return this.setState({ activeSuggestion: activeSuggestion - 1, showSuggestions: true }, () => {
          console.log('clientHeight', this.autocompletesRef.current.clientHeight)
          console.log('scrollHeight', this.autocompletesRef.current.scrollHeight)
          // console.log('scrollHeight', this.autocompletesRef.current.scrollHeight)
          // this.autocompletesRef.current.height
          // console.log('offsetHeight', this.autocompletesRef.current.offsetHeight)
          console.log('activeSuggestion', activeSuggestion - 1)
          console.log('activeSuggestion * height', (activeSuggestion - 1) * SUGGESTION_LI_HEIGHT)
          this.autocompletesRef.current.scrollBy({ top: -SUGGESTION_LI_HEIGHT })
        })
      case 40: // down arrow
        e.preventDefault()
        if (!showSuggestions) { return this.setState({ showSuggestions: true }) }
        if (activeSuggestion + 1 === filteredSuggestions.length) { return }

        return this.setState({ activeSuggestion: activeSuggestion + 1 }, () => {
          if (activeSuggestion > 3) {
            this.autocompletesRef.current.scrollBy({ top: SUGGESTION_LI_HEIGHT })
          }
        })
      case 13: // enter
        e.preventDefault()
        const filteredSuggestion = filteredSuggestions[activeSuggestion]
        return this.setState({
          activeSuggestion: filteredSuggestion ? suggestions.findIndex(suggestion => suggestion.value === filteredSuggestion.value) : 0,
          filteredSuggestions: suggestions,
          isUserInputMatch: !!filteredSuggestion,
          showSuggestions: false,
          userInput: filteredSuggestion ? filteredSuggestion.label : '',
        })
      case 27: // esc
        if (showSuggestions) {
          e.preventDefault()
          const filteredSuggestionESC = filteredSuggestions
            .filter(suggestion => suggestion.label === userInput)[0]
          this.setState({
            activeSuggestion: filteredSuggestionESC ? suggestions.findIndex(suggestion => suggestion.label === userInput) : 0,
            filteredSuggestions: suggestions,
            isUserInputMatch: !!filteredSuggestionESC,
            showSuggestions: false,
            userInput: filteredSuggestionESC ? filteredSuggestionESC.label : '',
          })
        }
    }
  }

  private onResetClick = (): void => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: this.props.suggestions,
      isUserInputMatch: false,
      showSuggestions: false,
      userInput: '',
    })
  }

  private onWindowMouseDown = (): void => {
    const { isMouseOver, userInput } = this.state
    const { suggestions } = this.props
    if (!isMouseOver) {
      let isUserInputMatch = false
      let nextUserInput = ''
      if (suggestions.filter(suggestion => suggestion.label === userInput).length > 0) {
        isUserInputMatch = true
        nextUserInput = userInput
      }
      this.setState({
        isUserInputMatch,
        showSuggestions: false,
        userInput: nextUserInput,
      })
    }
  }

  private onContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const { showSuggestions } = this.state
    this.setState({ showSuggestions: !showSuggestions })
  }

  private onSuggestionClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    const { filteredSuggestions } = this.state
    const { suggestions } = this.props
    const activeSuggestion = filteredSuggestions
      .findIndex(
        suggestion =>
          suggestion.label === e.currentTarget.innerText
      )
    const filteredSuggestion = filteredSuggestions[activeSuggestion]
    return this.setState({
      activeSuggestion: filteredSuggestion ? suggestions.findIndex(suggestion => suggestion.label === filteredSuggestion.label) : 0,
      filteredSuggestions: suggestions,
      isUserInputMatch: !!filteredSuggestion,
      showSuggestions: false,
      userInput: filteredSuggestion ? filteredSuggestion.label : '',
    })
  }

  private renderSuggestions = (): JSX.Element => {
    const { activeSuggestion, filteredSuggestions } = this.state

    const selectedSuggestions = filteredSuggestions

    return <ul ref={this.autocompletesRef} className='suggestions'>
      {selectedSuggestions.map((suggestion, idx) => {
        const liProps = {
          className: `suggestion${activeSuggestion === idx ? '-active' : ''}`,
          key: suggestion.value,
          onClick: this.onSuggestionClick,
        }
        return <li {...liProps}>{suggestion.label}</li>
      })}
    </ul>
  }

  render() {
    const { userInput, showSuggestions } = this.state
    const props = this.props
    const inputProps = {
      ...props,
      height: props.height || 'm',
      labelWidth: props.labelWidth || 'm',
      value: userInput,
      width: props.width || 'm',
    }
    return <div
      className='autocomplete'
      onClick={this.onContainerClick}
      onMouseEnter={() => this.setState({ isMouseOver: true })}
      onMouseLeave={() => this.setState({ isMouseOver: false  })}
    >
      <input
        value={userInput}
        onChange={this.onInputChange}
        onKeyDown={this.onInputKeyDown}
        // onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        />
      <div onClick={this.onResetClick}>
        <Icon name='close' />
      </div>
      {showSuggestions && this.renderSuggestions()}
    </div>
  }
}
