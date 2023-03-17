import { OpenInNew } from "@mui/icons-material"
import { Dialog, IconButton, Paper as MuiPaper, styled, Tab, Tabs, Typography } from "@mui/material"
import { DataGrid, GridSortModel } from "@mui/x-data-grid"
import { config } from "@site.config"
import { MyPageSeo } from "@src/components/MyPageSeo"
import dayjs from "dayjs"
import type { NextPage } from "next"
import { useState } from "react"
import useSWR from "swr"

type MyRowData = {
  id: number
  NoticeId: number
  StartDate: string
  EndDate: string
  Url: string
  Title: string
}

type MyData = {
  Notices: MyRowData[]
  Events: MyRowData[]
}
export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const response = await fetch(input, init)

  return response.json()
}

function InfoInternal(props: { onClick: () => void }) {
  return (
    <IconButton color="primary" onClick={props.onClick} size="large">
      <OpenInNew></OpenInNew>
    </IconButton>
  )
}

const Page: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState<MyRowData | null>(null)
  const [tabValue, setTabValue] = useState("Notices")
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "StartDate",
      sort: "desc",
    },
  ])

  const { data } = useSWR<MyData>("/api/news", fetcher)

  const Paper = styled(MuiPaper)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 2),
  }))

  const rows =
    data?.[tabValue as keyof MyData]?.map((item, index) => ({
      id: index,
      NoticeId: item.NoticeId,
      StartDate: dayjs(item.StartDate).format("YYYY/MM/DD HH:mm"),
      EndDate: dayjs(item.EndDate).format("YYYY/MM/DD HH:mm"),
      Url: item.Url,
      Title: item.Title,
    })) || []

  const columns = [
    {
      field: "action",
      headerName: "ニュースを表示",
      width: 150,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row as MyRowData
        return (
          <InfoInternal
            onClick={() => {
              setSelectedUrl(row)
              setOpen(true)
            }}
          />
        )
      },
    },
    { field: "StartDate", headerName: "公開時刻", width: 200 },
    { field: "Title", headerName: "タイトル", width: 600, sortable: false },
    { field: "EndDate", headerName: "公開終了時刻", width: 200 },
  ]

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <MyPageSeo title={config.siteMeta.title} noTitleTemplate={true} path="/" />
      <Typography variant={"h6"} fontWeight={"bold"}>
        ニュース
      </Typography>
      <Paper>
        <Tabs
          variant="scrollable"
          scrollButtons
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
        >
          <Tab label="お知らせ" value="Notices"></Tab>
          <Tab label="イベント" value="Events"></Tab>
        </Tabs>
      </Paper>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          rows={rows}
          columns={columns}
          loading={!data}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
        />
      </div>
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <iframe
          src={selectedUrl?.Url}
          style={{ width: "100%", height: "80vh" }}
          title={selectedUrl?.Title || ""}
        />
      </Dialog>
    </>
  )
}

export default Page
