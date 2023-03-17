import "@src/styles/globals.css"

import { Theme } from "@src/components/Theme"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </RecoilRoot>
  )
}
