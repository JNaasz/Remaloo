import './App.scss';
import { Box, Container } from '@mui/material';
import React, { useState } from 'react';

import LayoutTabs from './components/LayoutTabs'; // .tsx';
import TrainingTracker from './layouts/TrainingTracker';

const layouts: string[] = ['Home', 'Temp Tab'];

function App() {
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const handleTabChange = (newIndex: number) => {
    setLayoutIndex(newIndex);
  };

  const landingMsg: String = "Well hello there";
  return (
    <Container className="App">
      <Box className="grow" sx={{ p: 3 }}>
        {layouts[layoutIndex] === 'Home' && <TrainingTracker />}
        
        {layouts[layoutIndex] === 'Temp Tab' && <p>Placeholder Content</p>}
      </Box>

      <Box className="fixed" sx={{ p: 5 }}>
        <LayoutTabs
          layouts={layouts}
          layoutIndex={layoutIndex}
          onChange={handleTabChange}
        />
      </Box>
    </Container>
  );
}

export default App;
