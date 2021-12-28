import {Button, Slider, TextField, FormGroup, CircularProgress, Typography} from '@mui/material';
import type {NextPage} from 'next';
import {useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import supabase from '../lib/supabase';
import LogRocket from 'logrocket';

const rsvpIdentify = (name: string) => {
  try {
    LogRocket.identify(name);
  } catch (e) {
    console.log('could not identify user by name: ', name);
  }
};

const RSVP: NextPage = () => {
  const authenticated = useAuth();
  const [party, setParty] = useState(1);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    setStatus('');
    setLoading(false);
    setComments('');
    setName('');
    setParty(1);
  };

  const submit = async () => {
    setLoading(true);
    rsvpIdentify(name);
    try {
      const {data, error} = await supabase.from('attendees').insert([{name, party, comments}]);
      setLoading(false);
      if (data) {
        setStatus('success');
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

  const generateButton = () => {
    if (status === 'error') {
      return (
        <Button variant="outlined" size="large" color="error" onClick={reset}>
          Error
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
        sx={{mb: 5}}
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
      {generateButton()}
    </FormGroup>
  );
};

export default RSVP;
