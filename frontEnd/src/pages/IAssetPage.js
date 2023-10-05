import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {Card, Stack, Paper, Button, Popover, Container, Typography, IconButton,} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import UserSpanTable from "../sections/@dashboard/iasset/UserSpanTable"
// hooks
import useMode from "../hooks/display/useMode";

// ----------------------------------------------------------------------

export default function IAssetPage() {
  const {mode, setMode} = useMode();
    return(
      mode==='dark'?<UserSpanTable />:<div>A</div>
    )
}

