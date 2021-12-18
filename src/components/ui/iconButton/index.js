import React from "react";
import { TouchableHighlight, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

function IconButton(props) {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onPress} style={styles.btnContainer}>
      <Image source={props.icon} style={styles.btnIcon} />
    </TouchableHighlight>
  );
}

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.number.isRequired,
};

export default IconButton;
