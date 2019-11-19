import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const CustomSelect = ({
  color,
  options,
  onChange,
  inverted,
  defaultValue,
  style,
  ...props
}) => {
  return (
    <div style={style}>
      <Select
        defaultValue={defaultValue}
        options={options}
        onChange={onChange}
        styles={styles(color, inverted)}
        maxMenuHeight={140}
        menuPosition="fixed"
        {...props}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  inverted: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({})
};

CustomSelect.defaultProps = {
  inverted: false,
  defaultValue: undefined,
  style: {}
};

const styles = (color, inverted) => {
  const invertBackground = inverted ? color.foreground : color.background;
  const invertForeground = inverted ? color.background : color.foreground;

  return {
    control: styles => ({
      ...styles,
      padding: 0,
      borderRadius: 0,
      borderWidth: 0,
      backgroundColor: invertForeground,
      color: invertBackground
    }),
    option: (styles, { data }) => ({
      ...styles,
      fontFamily: data.value,
      color: invertForeground
    }),
    dropdownIndicator: styles => ({
      ...styles,
      color: invertBackground
    }),
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: invertBackground
    }),
    menu: styles => ({
      ...styles,
      borderRadius: 0,
      backgroundColor: invertBackground,
      borderWidth: "2px",
      borderColor: invertForeground,
      borderStyle: "solid",
      marginTop: 0,
      marginBottom: 0
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      fontFamily: data.value,
      color: invertBackground
    }),
    placeholder: styles => ({
      ...styles,
      fontFamily: "arial"
    })
  };
};

export default CustomSelect;
