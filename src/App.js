import React from "react";
import { SWRConfig } from "swr";
import Index from "pages/index";

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (...args) => fetch(...args).then(res => res.json()),
      }}
    >
      <Index />
    </SWRConfig>

  );
}

export default App;
