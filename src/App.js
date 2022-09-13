import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


const App = ({ interval }) => {

  const [state, setState] = useState({
    countStart: interval,
    count: interval,
    notifying: false,
    running: false,
  });

  const timerEnd = () => {
    if (state.notifying) {
      const _ = new Notification("Time!", {body: "You know what to do."});
    }
  }

  const checkPermission = async () => {
    const permission = await Notification.requestPermission();
    const result = (permission === "granted");
    setState((prevState) => ({...prevState, notifying: result}));
  };

  const updateCount = () => {
    setState((prevState) => {
      const { count, countStart } = prevState;
      return {...prevState, count: (count > 0 ? count - 1 : countStart)};
    });
  };

  const startTimer = () => {
    checkPermission();
    setInterval(() => {
      updateCount();
    }, 1000);
    setState((prevState) => {
      return {...prevState, running: true};
    });
  };

  useEffect(() => {
    if (state.count === 0) {
      timerEnd();
    }
  }, [state.count]);


  return (
    <div className="App">
      <Card variant="outlined" sx={{ maxWidth: 345, margin: 'auto', mt: 2 }}>
        <CardContent>
          <Button 
            variant="contained"
            onClick={startTimer}
            disabled={state.running}
          >
            Start
          </Button>
          <Typography
            variant="h5"
            gutterBottom
          >
            <span>{state.count} {String(state.notifying)}</span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
