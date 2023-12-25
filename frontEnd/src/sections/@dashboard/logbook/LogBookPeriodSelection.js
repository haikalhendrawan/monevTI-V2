import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, 
 } from '@mui/material';


 // -------------------------------------------------------------------------------
  const selectTahun = [
    {jenis:'2022', value:0},
    {jenis:'2023', value:1},
    {jenis:'2024', value:2},
    ];
  const selectTriwulan = [
    {jenis:'All', value:0},
    {jenis:'Q1', value:1},
    {jenis:'Q2', value:2},
    {jenis:'Q3', value:3},
    {jenis:'Q4', value:4},
    ];

// -------------------------------------------------------------------------------------------------

export default function LogBookPeriodSelection(props){
  const {value:periodValue, onYearChange:handleYearChange, onPeriodChange:handlePeriodChange} = props;

  return(
    <Stack direction="row" alignItems="center" justifyContent="center " spacing={2} mb={5}>
      <FormControl sx={{  minWidth: 120 }}>
        <InputLabel id="select-periode" sx={{typography:'body2'}}>Tahun</InputLabel>
        <Select required name="tahun" value={periodValue.tahun} sx={{  typography:'body2'}} label="select-periode" onChange={handleYearChange} size='small'>
            {selectTahun.map((item, index) => {
            return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
            })}
        </Select>
      </FormControl>
      <FormControl sx={{  minWidth: 120 }}>
        <InputLabel id="select-periode" sx={{typography:'body2'}}>Triwulan</InputLabel>
        <Select required name="triwulan" value={periodValue.triwulan} sx={{ typography:'body2'}} label="select-periode" onChange={handlePeriodChange} size='small'>
            {selectTriwulan.map((item, index) => {
            return(<MenuItem key={index} sx={{typography:'body2'}} value={item.value}>{item.jenis}</MenuItem>)
            })}
        </Select>
      </FormControl>
    </Stack>
  )
};