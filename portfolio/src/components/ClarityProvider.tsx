"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const PROJECT_ID = "wxf0s4s34u";

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init(PROJECT_ID);
  }, []);

  return null;
}
