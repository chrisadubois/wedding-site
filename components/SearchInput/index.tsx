import {useState, useEffect, ReactElement, useRef} from 'react';
import {Autocomplete, CircularProgress, TextField, Button, Stack, Box, Tooltip} from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';
import {Track, Tracks} from '../../types/global';

const search = async (term: string): Promise<Tracks> => {
  const searchTracks = await axios.post('/api/searchTracks', {
    term,
  });
  return searchTracks.data;
};

const add = async (uri: string): Promise<boolean> => {
  const addTrack = await axios.post('/api/addTrack', {
    uri,
  });
  return addTrack.status > 199 && addTrack.status < 400;
};

const Search = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Array<Track>>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const disabledAdd = disabled || !selectedTrack?.length;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (query && query.length > 0) {
        setLoading(true);
        const results = await search(query);
        setLoading(false);
        setOptions([...results?.tracks?.items]);
      }
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleChange = (event: any, value: string) => {
    setQuery(value);
  };

  const handleSelect = (event: any, value: Track | null) => {
    setSelectedTrack(value?.uri || '');
    setOptions([]);
  };

  const reset = () => {
    setSelectedTrack('');
    setQuery('');
    setOptions([]);
    setLoading(false);
  };

  const handleAdd = async (event: any) => {
    setDisabled(true);
    const isAdded = await add(selectedTrack);
    if (isAdded) {
      reset();
      setTimeout(() => {
        setDisabled(false);
      }, 10000);
    } else {
      setDisabled(false);
    }
  };

  return (
    <Stack direction="column" spacing={3} sx={{width: '80%'}} justifyContent="center">
      <Autocomplete
        id="track-search"
        filterOptions={(x) => x}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => `${option.name} - ${option.artists?.[0]?.name}`}
        options={options}
        loading={loading}
        onChange={handleSelect}
        onInputChange={handleChange}
        renderInput={(params) => (
          <TextField
            sx={{width: '100%'}}
            {...params}
            label="Search Tracks"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Box sx={{textAlign: 'center'}}>
        <Tooltip title="It may take a day for the track to appear">
          <Button variant="contained" onClick={handleAdd} disabled={disabledAdd}>
            {disabled ? 'Wait a sec' : 'Add Selected Track'}
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Search;
