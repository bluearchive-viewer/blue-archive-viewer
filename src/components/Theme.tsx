import { ThemeProvider } from "@emotion/react"
import {
  AutoStories,
  Brightness4,
  Brightness7,
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
  CssBaseline,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  StyledEngineProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import { config } from "@site.config"
import { usePaletteMode } from "@src/stores/palette-mode"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { MouseEvent } from "react"

const drawerWidth = 240

export const Theme = ({ children }: { children: ReactNode }) => {
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

  const [paletteMode, setPaletteMode] = usePaletteMode()
  const [isDarkMode, setIsDarkMode] = useState(paletteMode === "dark")

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  })

  useEffect(() => {
    setIsDarkMode(paletteMode === "dark")
  }, [paletteMode])

  const handleChangePaletteMode = (event: MouseEvent<HTMLButtonElement>) => {
    const paletteMode = isDarkMode ? "light" : "dark"
    setPaletteMode(paletteMode)
    setIsDarkMode(!isDarkMode)
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Root>
          <CssBaseline />
          <DesktopAppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {config.siteMeta.title}
              </Typography>
              {isDarkMode ? (
                <IconButton color="inherit" onClick={handleChangePaletteMode}>
                  <Brightness7 />
                </IconButton>
              ) : (
                <IconButton color="inherit" onClick={handleChangePaletteMode}>
                  <Brightness4 />
                </IconButton>
              )}

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
            {children}
          </Container>
        </Root>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
