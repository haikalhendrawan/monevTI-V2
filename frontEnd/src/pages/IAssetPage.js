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
import IAssetLanding from "../sections/@dashboard/iasset/IAssetLanding";
import AssetTikSection from "../sections/@dashboard/iasset/AssetTikSection";
import UserTikSection from "../sections/@dashboard/iasset/UserTikSection";
// hooks
import useMode from "../hooks/display/useMode";
import { AssetProvider } from "../sections/@dashboard/iasset/useAsset";
import {IUserProvider} from "../sections/@dashboard/iasset/useIUser";
// ----------------------------------------------------------------------

export default function IAssetPage() {
  const [open, setOpen] = useState(1); // display {1:generate report, 2:Perangkat TIK, 3:User TIK}
  const handleClick = (number) => {
    setOpen(number);
  };

  const component = 
  { 
    1:<IAssetLanding changeSection={handleClick}/>,
    2:<AssetTikSection changeSection={handleClick}/>,
    3:<UserTikSection changeSection={handleClick}/>
  }

  return(
    <>
      <Helmet>
        <title> Data TIK | MonevTI  </title>
      </Helmet>

      <AssetProvider>
        <IUserProvider>
          {component[open]}
        </IUserProvider>
      </AssetProvider>
      

    </>
  )
}

