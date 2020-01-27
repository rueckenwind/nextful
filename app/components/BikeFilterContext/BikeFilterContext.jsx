import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getSession, setSession } from '../../js/session'

const BikeFilterContext = React.createContext()

const SESSION_ID = 'bikefilter'

export class BikeFilterProvider extends PureComponent {
  state = {
    category: [],
    frameShape: [],
  }

  componentDidMount() {
    // this.getParamsFromUrl();
    this.getParamsFromSession()
  }

  componentDidUpdate() {
    // this.setStateToUrl();
    this.setStateToSession()
  }

  getParamsFromSession = () => {
    const sessionParams = getSession(SESSION_ID)

    this.setState(currentState => {
      if (sessionParams !== currentState) {
        return sessionParams
      }
    })
  }

  setStateToSession = () => {
    setSession(SESSION_ID, this.state)
  }

  // getParamsFromUrl = () => {
  //   const urlSearchParams = qs.parse(window.location.search.substring(1));

  //   this.setState((currentState) => {
  //     if (urlSearchParams !== currentState) {
  //       return urlSearchParams;
  //     }
  //   });
  // }

  // setStateToUrl = () => {
  //   const urlSearchParams = qs.parse(window.location.search.substring(1));
  //   const paramString = qs.stringify(this.state, { arrayFormat: 'brackets' });

  //   if (urlSearchParams !== this.state && paramString) {
  //     window.history.pushState(null, 'tadaa', `${window.location.pathname}?${paramString}`);
  //   }
  // }

  handleChange = (key, selectedOption, isMulti = true) => {
    const stateValue = !isMulti
      ? selectedOption.value
      : selectedOption.map(opt => opt.value)

    this.setState({ [key]: stateValue })
  }

  render() {
    const { handleChange, state, props } = this
    const { bikes, bikeCategories, bikeFrameShapes } = props

    const filteredBikes = !bikes
      ? []
      : bikes
          .filter(bike => {
            if (!state.category.length) return true
            return state.category.some(
              category => category === bike.category.id,
            )
          })
          .filter(bike => {
            if (!state.frameShape.length) return true
            return bike.frameShapes.some(shape =>
              state.frameShape.some(frameShape => frameShape === shape.id),
            )
          })

    return (
      <BikeFilterContext.Provider
        value={{
          ...this.state,
          bikes: filteredBikes,
          bikeCategories,
          bikeFrameShapes,
          handleChange,
        }}
      >
        {props.children}
      </BikeFilterContext.Provider>
    )
  }
}

BikeFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
  bikes: PropTypes.array.isRequired,
  bikeCategories: PropTypes.array.isRequired,
  bikeFrameShapes: PropTypes.array.isRequired,
}

export const BikeFilterConsumer = BikeFilterContext.Consumer
