import {
  Button,
  Slider,
  TextField,
  FormGroup,
  CircularProgress,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stack,
} from '@mui/material';
import type {NextPage} from 'next';
import {ChangeEvent, ReactNode, useContext, useEffect, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import {supabase} from '../lib/supabase';
import LogRocket from 'logrocket';
import {AppContext} from '../context';
import {Types} from '../context/reducers';

const rsvpIdentify = (name: string) => {
  try {
    LogRocket.identify(name);
  } catch (e) {
    console.log('could not identify user by name: ', name);
  }
};

enum MEAL {
  Chicken = 'Chicken',
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
}

const RSVP: NextPage = () => {
  const authenticated = useAuth();
  const [party, setParty] = useState(1);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [meal, setMeal] = useState<MEAL>(MEAL.Chicken);
  const {state, dispatch} = useContext(AppContext);

  const handleMeal = (event: ChangeEvent<HTMLInputElement>) => {
    setMeal(event.target.value as MEAL);
  };

  const reset = () => {
    setStatus('');
    setLoading(false);
    setComments('');
    setName('');
    setParty(1);
    setMeal(MEAL.Chicken);
  };

  const submit = async () => {
    setLoading(true);
    rsvpIdentify(name);
    try {
      const {data, error} = await supabase.from('attendees').insert([{name, party, comments, meal}]);
      setLoading(false);
      if (data) {
        setStatus('success');
        setTimeout(() => {
          dispatch({
            type: Types.RsvpSubmitted,
            payload: {
              submitted: true,
            },
          });
        });
      } else {
        setStatus('error');
      }
    } catch (e) {
      setLoading(false);
      setStatus('error');
    }
  };

  if (!authenticated) {
    return null;
  }

  const generateMarks = (): Array<{value: number; label: string}> => {
    const marks = [];
    for (let i = 1; i <= 5; i++) {
      marks.push({value: i, label: `${i}`});
    }
    return marks;
  };

  const getValueText = (value: number): string => {
    return `${value}`;
  };

  const generateRadioButtons = (): ReactNode => {
    return Object.values(MEAL).map((option, i) => {
      return (
        <FormControlLabel key={`meal-${i}`} value={option} control={<Radio />} label={option} labelPlacement="end" />
      );
    });
  };

  const generateButton = () => {
    if (status === 'error') {
      return (
        <Button variant="outlined" size="large" color="error" onClick={reset}>
          Error
        </Button>
      );
    } else if (state.rsvp.submitted) {
      return (
        <Button variant="outlined" size="large" color="success" disabled>
          Submitted
        </Button>
      );
    } else if (status === 'success') {
      return (
        <Button variant="outlined" size="large" color="success">
          Success
        </Button>
      );
    } else if (loading) {
      return (
        <Button variant="outlined" size="large" color="secondary">
          <CircularProgress />
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled={!name} size="large" onClick={() => submit()}>
          Submit
        </Button>
      );
    }
  };

  return (
    <FormGroup sx={{width: '50%'}}>
      <TextField
        sx={{mb: 5}}
        required
        id="name-required"
        label="Name"
        placeholder="Sara Crauer"
        value={name}
        onChange={(event) => {
          if (/[A-Za-z]/gi.test(event.target.value)) {
            setName(event.target.value);
          }
        }}
        inputProps={{maxLength: 50}}
      />
      <Typography id="party-slider" gutterBottom>
        Party Size
      </Typography>
      <Slider
        id="party-slider"
        sx={{mb: 8}}
        aria-label="Party Size"
        defaultValue={1}
        getAriaValueText={getValueText}
        valueLabelDisplay="auto"
        step={1}
        value={party}
        marks={generateMarks()}
        min={1}
        max={5}
        onChange={(event, value) => setParty(value as number)}
      />
      <TextField
        id="rsvp-comments"
        label="Comments"
        sx={{mb: 5}}
        multiline
        maxRows={4}
        inputProps={{maxLength: 200}}
        defaultValue=""
        value={comments}
        placeholder="We can't wait to see you on July 16, 2022!"
        onChange={(event) => setComments(event.target.value)}
      />
      <FormControl sx={{mb: 5}}>
        <FormLabel id="meal-options-group label">Meal Options</FormLabel>
        <RadioGroup
          sx={{display: `flex`, justifyContent: `space-between`}}
          row
          name="meal-options"
          value={meal}
          onChange={handleMeal}
        >
          {generateRadioButtons()}
        </RadioGroup>
      </FormControl>
      {generateButton()}
    </FormGroup>
  );
};

export default RSVP;
