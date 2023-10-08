import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {Card, Box, CardHeader,  Stack, Paper, Button, Popover, Grid, Container, Typography, IconButton,} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import UserSpanTable from "../sections/@dashboard/iasset/UserSpanTable"
import IAssetLanding from "../sections/@dashboard/iasset/IAssetLanding"
// hooks
import useMode from "../hooks/display/useMode";

// ----------------------------------------------------------------------

export default function IAssetPage() {
  const [open, setOpen] = useState(1); // display {1:generate report, 2:Perangkat TIK, 3:User TIK}
  const handleClick = (number) => {
    setOpen(number);
  };

  const component = {
    1:<IAssetLanding function={handleClick}/>,
    2:<UserSpanTable function={handleClick}/>
  }

  return(
    <>
      <Helmet>
        <title> Data TIK | MonevTI  </title>
      </Helmet>

      {component[open]}

    </>
  )
}

