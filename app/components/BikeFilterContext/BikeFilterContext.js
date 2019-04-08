import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const BikeFilterContext = React.createContext();

export class BikeFilterProvider extends PureComponent {
  constructor() {
    super();
    this.state = {
      categories: [],
      frameShapes: [],
    };
  }

  handleChange = (key, selectedOption) => {
    console.log('Option selected:', selectedOption, key);
    this.setState({ [key]: selectedOption });
  };


  render() {
    const { handleChange } = this;
    const {
      bikeCategories,
      bikeFrameShapes,
    } = this.props;

    const filteredBikes = !this.props.bikes ? [] : this.props.bikes
      .filter((bike) => {
        if (!this.state.categories.length) return true;
        return this.state.categories.some(category => category.value === bike.category.id);
      })
      .filter((bike) => {
        if (!this.state.frameShapes.length) return true;
        return bike.frameShapes.some(shape =>
          this.state.frameShapes.some(frameShape => frameShape.value === shape.id));
      });

    return (
      <BikeFilterContext.Provider
        value={{
          ...this.state,
          bikes: filteredBikes,
          bikeCategories,
          bikeFrameShapes,
          handleChange,
        }}>
        { this.props.children }
      </BikeFilterContext.Provider>
    );
  }
}

BikeFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
  bikes: PropTypes.array.isRequired,
  bikeCategories: PropTypes.array.isRequired,
  bikeFrameShapes: PropTypes.array.isRequired,
};

export const BikeFilterConsumer = BikeFilterContext.Consumer;
