import React from "react";
import styles from "./Button.module.css";

export const Button = ({ title, onClick }) => {
  return (
    <button className={styles.button} type="button" onClick={() => onClick()}>
      Randomize new movie
    </button>
  );
};
