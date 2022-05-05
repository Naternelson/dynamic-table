import React, { ReactNode, useEffect, useState } from 'react';
import { Box, BoxProps, Paper, PaperProps, Table, TableHead, TableBody, TableRow, TableCell, Checkbox, TableContainer, Button } from '@mui/material';
import {faker} from "@faker-js/faker"
import DynamicTable from './components/dynamic-table';
import DynamicTableContainer from './components/dynamic-table/dynamic-table-container';
function App() {
  const appWrapper:BoxProps = {
    display:'flex',
    height: '100vh',
    width: '100vw',
    m:0,
    p:0,
    overflow:'hidden',
    bgcolor: '#fff9eb'
  }

  return (
    <Box {...appWrapper}>
      <Paper elevation={24} sx={{display:'flex', flex:1,m:3}}>
        <DynamicTableContainer containerProps={{p:3}}>
          <DynamicTable>
            <TableHead>
              <TableRow>
                <TableCell>
                  Hello there
                </TableCell>
              </TableRow>
            </TableHead>
          </DynamicTable>
        </DynamicTableContainer>
      </Paper>
    </Box>
  );
}

export default App;
