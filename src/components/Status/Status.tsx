import React from "react";

import * as Styles from "./styles";

export interface IStatus {
  status: "finished" | "problematic" | "critical";
  title: string;
}

const Status = ({ status, title }: IStatus) => (
  <Styles.Container>
    {status === "finished" && <Styles.FinishedIcon />}
    {status === "problematic" && <Styles.ProblematicIcon />}
    {status === "critical" && (
      <>
        <Styles.CriticalIcon />
        <Styles.CriticalWarningIcon />
        <Styles.CriticalWarningWhiteIcon />
      </>
    )}
    <Styles.Title>{title}</Styles.Title>
  </Styles.Container>
);

export default Status;
