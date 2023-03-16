import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {config} from 'site.config';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
return (
  <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
{config.siteMeta.title}
    </Typography>
  </Toolbar>
</AppBar>
);
}
