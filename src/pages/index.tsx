import { Alert, Typography, useTheme } from "@mui/material"
import { config } from "@site.config"
import { MyPageSeo } from "@src/components/MyPageSeo"
import type { NextPage } from "next"

const Page: NextPage = () => {
  const theme = useTheme()

  return (
    <>
      <MyPageSeo title={config.siteMeta.title} noTitleTemplate={true} path="/" />
      <Typography variant={"h6"} fontWeight={"bold"}>
        ホーム
      </Typography>
      <Alert sx={{ margin: theme.spacing(1, 0) }} severity="info">
        本サイトは研究を目的としたファンメイドのデータベースであり、NEXON
        GamesやYostarとは一切の関係がありません。使用されているすべての著作物はそれぞれの権利者に帰属します。
      </Alert>
    </>
  )
}
export default Page
