import '../styles/App.scss';
import { Box, Container } from '@mui/material';
import React, { useState } from 'react';

import LayoutTabs from '../layouts/LayoutTabs'; // .tsx';
import TrainingTracker from '../layouts/TrainingTracker';

import { useTheme } from '@mui/material/styles';

const layouts: string[] = ['Home', 'Temp Tab'];

function App() {
  const theme = useTheme();
  console.log(theme.palette);
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const handleTabChange = (newIndex: number) => {
    setLayoutIndex(newIndex);
  };

  return (
    <Container
      className="App"
      sx={{ backgroundColor: (theme) => theme.palette.background.default }}
    >
      <Box className="grow" sx={{ p: 3, overflow: 'hidden' }}>
        {layouts[layoutIndex] === 'Home' && <TrainingTracker />}

        {layouts[layoutIndex] === 'Temp Tab' && <p>Placeholder Content</p>}
      </Box>

      <Box className="fixed" sx={{ p: 4, pt: 0, display: 'flex', justifyContent: 'center' }}>
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
