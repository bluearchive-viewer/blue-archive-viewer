import "@src/styles/globals.css"

import {
  AutoStories,
  EventNote,
  GitHub,
  Home,
  LibraryMusic,
  MoveToInbox,
  Newspaper,
  PeopleAlt,
} from "@mui/icons-material"
import {
  AppBar as MuiAppBar,
  Box,
  Container,
  createTheme,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import { styled, StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import { config } from "@site.config"
import type { AppProps } from "next/app"
import { useMemo } from "react"

const drawerWidth = 240

export default function App({ Component, pageProps }: AppProps) {
  const DesktopAppBar = styled(MuiAppBar)(({ theme }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
  }))

  const Root = useMemo(
    () =>
      styled(Box)(({ theme }) => ({
        "& .app-inner-drawer-content": {
          flexGrow: 1,
          padding: theme.spacing(2),
          [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`,
          },
        },
        "& .app-inner-drawer-toolbar": {
          ...theme.mixins.toolbar,
          alignItems: "center",
          display: "flex",
          padding: theme.spacing(0, 3),
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

  const theme = createTheme({
    // TODO:テーマ設定を行います
  })

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
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
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="ホーム" />
                </ListItem>
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
            <Container className="app-inner-drawer-content">
              <div className="app-inner-drawer-toolbar" id="back-to-top-anchor"></div>
              <Component {...pageProps} />
            </Container>
          </Root>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}
