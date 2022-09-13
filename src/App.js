import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


const Timer = ({label, initialAmount, whenDone}) => {
  
}

const App = () => {

  const [rating, setRating] = useState(3);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [running, setRunning] = useState(false);

  const updateCount = () => {
    setCount(c => c + 1);
  }

  const toggleRunning = () => {
    setRunning((prevRunning) => {
      if (!prevRunning) {
        setTimer(setInterval(() => {
          updateCount();
        }, 1000));
      } else {
        clearInterval(timer);
      }
      return !prevRunning;
    });
  }

  return (
    <div className="App">
      <Card variant="outlined" sx={{ maxWidth: 345, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Button 
            variant="contained"
            onClick={toggleRunning}
          >
            Click Me
          </Button>
          <Typography
            variant="h5"
            gutterBottom
          >
            {count}
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(_, newRating) => {
              setRating(newRating);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
