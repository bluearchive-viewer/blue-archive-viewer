import {
  AutoStories,
  EventNote,
  GitHub,
  LibraryMusic,
  MoveToInbox,
  Newspaper,
  PeopleAlt,
} from "@mui/icons-material"
import {
  AppBar as MuiAppBar,
  Box,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { config } from "@site.config"
import { MyPageSeo } from "@src/components/MyPageSeo"
import type { NextPage } from "next"
import { useMemo } from "react"

const drawerWidth = 240

const Page: NextPage = () => {
  const DesktopAppBar = styled(MuiAppBar)(({ theme }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
  }))

  const Root = useMemo(
    () =>
      styled(Box)(({ theme }) => ({
        "& .list-item-link-inner": {
          paddingBottom: "2px",
          paddingTop: "2px",
          [theme.breakpoints.down("lg")]: {
            paddingBottom: "8px",
            paddingTop: "8px",
          },
        },
        width: "100%",
        display: "flex",
      })),
    [],
  )

  const Drawer = styled(MuiDrawer)(({ theme }) => ({
    boxSizing: "border-box",
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
    },
  }))

  return (
    <>
      <MyPageSeo title={config.siteMeta.title} noTitleTemplate={true} path="/" />
      <Root>
        <DesktopAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {config.siteMeta.title}
            </Typography>
            <a href={config.siteMeta.repository}>
              <IconButton
                color="inherit"
                style={{ padding: ".6rem", color: "white" }}
                size="medium"
              >
                <GitHub fontSize="inherit" />
              </IconButton>
            </a>
          </Toolbar>
        </DesktopAppBar>
        <Drawer variant="permanent">
          <List>
            <ListItem button>
              <ListItemIcon>
                <Newspaper />
              </ListItemIcon>
              <ListItemText primary="ニュース" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LibraryMusic />
              </ListItemIcon>
              <ListItemText primary="曲" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="キャラクター" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EventNote />
              </ListItemIcon>
              <ListItemText primary="イベント" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MoveToInbox />
              </ListItemIcon>
              <ListItemText primary="ガチャ" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AutoStories />
              </ListItemIcon>
              <ListItemText primary="ストーリー" />
            </ListItem>
          </List>
        </Drawer>
      </Root>
    </>
  )
}
export default Page
