import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Card,
  Chip,
  Divider,
  Input,
  Slider,
  Typography,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const selectOptions = [
  {
    label: 'Loài',
    options: [
      'Chó',
      'Mèo',
      'Chuột Hamster',
      'Khác'
    ]
  },
  {
    label: 'Giới tính',
    options: ['Đực', 'Cái']
  },
  {
    label: 'Tuổi',
    options: [
      'Dưới 1 tuổi',
      'Từ 1 - 3 tuổi',
      'Trên 3 tuổi',
    ]
  },
  {
    label: 'Tiêm phòng',
    options: ['Đã tiêm phòng']
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  },
  slider: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: '1.5%',
    paddingRight: '1.5%'
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '2%'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Filter({ className, ...rest }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [price, setPrice] = useState([0, 20]);
  const history = useHistory();
  const queryString = useQuery();

  useEffect(() => {
    if (queryString.has('q')) {
      setInputValue(queryString.get('q'));
    }
    if (queryString.has('species')) {
      setChips((oldChips) => [...oldChips, ...queryString.getAll('species')]);
    }
    if (queryString.has('gender')) {
      setChips((oldChips) => [...oldChips, ...queryString.getAll('gender')]);
    }
    if (queryString.has('startAge')) {
      if (queryString.has('endAge')) {
        if (queryString.get('endAge') === '12') {
          setChips((oldChips) => [...oldChips, 'Dưới 1 tuổi']);
        } else {
          setChips((oldChips) => [...oldChips, 'Từ 1 - 3 tuổi']);
        }
      } else {
        setChips((oldChips) => [...oldChips, 'Trên 3 tuổi']);
      }
    }
    if (queryString.has('vaccination')) {
      setChips((oldChips) => [...oldChips, 'Đã tiêm phòng']);
    }
    if (queryString.has('startPrice') && queryString.has('endPrice')) {
      setPrice([parseInt(queryString.get('startPrice'), 10), parseInt(queryString.get('endPrice'), 10)]);
    }
  }, []);

  const handleChipDelete = (chip) => {
    setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip));
  };

  const handleMultiSelectChange = (value) => {
    setChips(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const onButtonClick = () => {
    let query = `/?q=${inputValue}`;
    query += '&page=1';
    chips.forEach((chip) => {
      if (selectOptions[0].options.includes(chip)) {
        query += `&species=${chip}`;
      }
      if (selectOptions[1].options.includes(chip)) {
        query += `&gender=${chip}`;
      }
      if (selectOptions[2].options.includes(chip)) {
        if (chip === 'Dưới 1 tuổi') {
          query += '&startAge=0&endAge=12';
        } else if (chip === 'Từ 1 - 3 tuổi') {
          query += '&startAge=12&endAge=36';
        } else {
          query += '&startAge=36';
        }
      }
      if (chip === 'Đã tiêm phòng') {
        query += '&vaccination=1';
      }
    });

    query += `&startPrice=${price[0]}`;
    query += `&endPrice=${price[1]}`;
    history.push(query);
  };

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 20,
      label: '20',
    },
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        display="flex"
        alignItems="center"
      >
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setInputValue(event.target.value);
            }
          }}
          placeholder="Nhập tên bài muốn tìm"
          value={inputValue}
        />
      </Box>
      <Divider />
      <Box
        p={2}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography
          id="range-slider"
          gutterBottom
          variant="h6"
          color="textPrimary"
        >
          MỨC GIÁ (triệu VNĐ)
        </Typography>
        <div className={classes.slider}>
          <Slider
            value={price}
            onChange={handlePriceChange}
            min={0}
            max={20}
            step={0.5}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </div>
        {chips.map((chip) => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </Box>
      <Divider />
      <Grid
        container
        justify="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          p={1}
        >
          {selectOptions.map((option) => (
            <MultiSelect
              key={option.label}
              label={option.label}
              onChange={handleMultiSelectChange}
              options={option.options}
              value={chips}
            />
          ))}
          <Box flexGrow={1} />
        </Box>
        <Box className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={onButtonClick}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Grid>
    </Card>
  );
}

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
