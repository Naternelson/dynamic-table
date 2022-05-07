import React, { useState } from 'react';
import { Box, BoxProps, Paper} from '@mui/material';
import DynamicTable from './components/dynamic-table';
import DynamicTableContainer from './components/dynamic-table/dynamic-table-container';
import DynamicHeader from './components/dynamic-table/header';
import { useStore } from 'react-redux';
function App() {
  const store = useStore()
  const state = store.getState()
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
            <DynamicHeader/>
          </DynamicTable>
        </DynamicTableContainer>
      </Paper>
    </Box>
  );
}

export default App;
