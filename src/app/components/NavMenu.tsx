"use client";
import { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useServerInsertedHTML } from "next/navigation";
import Navigator from "./Navigator";

export default function NavMenu() {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <Navigator />
    </StyleSheetManager>
  );
}
