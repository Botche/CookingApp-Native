import React from "react";
import { TouchableHighlight, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import constants from "../../../constants";

function BackButton(props) {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.btnContainer}>
      <Image source={constants.icons.backArrow} style={styles.btnIcon} />
    </TouchableHighlight>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};

export default BackButton;
