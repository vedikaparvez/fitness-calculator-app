import * as React from 'react';
import { Grid, TextField, Typography, Box, Button, Stack, IconButton, Switch, FormControlLabel } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const activityLevels = [
    { label: 'Inactive', description: 'Never or rarely include physical activity in your day.' },
    { label: 'Somewhat active', description: 'Include light activity or moderate activity about two to three times a week.' },
    { label: 'Active', description: 'Include at least 30 minutes of moderate activity most days of the week, or 20 minutes of vigorous activity at least three days a week.' },
    { label: 'Very active', description: 'Include large amounts of moderate or vigorous activity in your day.' },
];

export const FormQuestions = ({ setCalories }) => {
    const [age, setAge] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [weight, setWeight] = useState('');
    const [weightLbs, setWeightLbs] = useState('');
    const [sex, setSex] = useState(0);
    const [activityLevel, setActivityLevel] = useState(0);
    const [isMetricHeight, setIsMetricHeight] = useState(false); // Switch for height
    const [isMetricWeight, setIsMetricWeight] = useState(false); // Switch for weight

    const handleAgeChange = (e) => setAge(e.target.value);

    const handleHeightFeetChange = (e) => setHeightFeet(e.target.value);
    const handleHeightInchesChange = (e) => setHeightInches(e.target.value);
    const handleHeightCmChange = (e) => setHeightCm(e.target.value);

    const handleWeightChange = (e) => setWeight(e.target.value);
    const handleWeightLbsChange = (e) => setWeightLbs(e.target.value);

    const handleSexChange = (e) => setSex(e.target.value);
    const handleActivityLevelChange = (e) => setActivityLevel(e.target.value);

    // Conversion logic
    const toggleHeightUnits = () => {
        setIsMetricHeight(!isMetricHeight);
        if (!isMetricHeight) {
            // Convert feet-inches to cm
            const cm = (parseFloat(heightFeet || 0) * 30.48) + (parseFloat(heightInches || 0) * 2.54);
            setHeightCm(cm.toFixed(2));
            setHeightFeet('');
            setHeightInches('');
        } else {
            // Convert cm to feet-inches
            const totalInches = parseFloat(heightCm || 0) / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = (totalInches % 12).toFixed(0);
            setHeightFeet(feet);
            setHeightInches(inches);
            setHeightCm('');
        }
    };

    const toggleWeightUnits = () => {
        setIsMetricWeight(!isMetricWeight);
        if (!isMetricWeight) {
            // Convert kg to lbs
            setWeightLbs((parseFloat(weight || 0) * 2.20462).toFixed(2));
            setWeight('');
        } else {
            // Convert lbs to kg
            setWeight((parseFloat(weightLbs || 0) / 2.20462).toFixed(2));
            setWeightLbs('');
        }
    };

    const calculateBMR = () => {
        const heightInCm = isMetricHeight
            ? parseFloat(heightCm || 0)
            : (parseFloat(heightFeet || 0) * 30.48) + (parseFloat(heightInches || 0) * 2.54);
        const weightInKg = isMetricWeight ? parseFloat(weight || 0) : parseFloat(weightLbs || 0) / 2.20462;
        const ageInYears = parseFloat(age || 0);

        if (sex === "male") {
            return (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageInYears) + 5;
        } else {
            return (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageInYears) - 161;
        }
    };

    const handleSubmit = () => {
        const bmr = calculateBMR();
        const activityMultiplier = {
            Inactive: 1.2,
            'Somewhat active': 1.375,
            Active: 1.55,
            'Very active': 1.725,
        }[activityLevel] || 1.2;

        const totalCalories = bmr * activityMultiplier;
        setCalories(totalCalories.toFixed(2));
    };

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Typography>Age</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        required
                        fullWidth
                        placeholder="Enter your age"
                        type="number"
                        onChange={handleAgeChange}
                        value={age}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Typography>Height</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    {isMetricHeight ? (
                        <TextField
                            required
                            label="Height (cm)"
                            fullWidth
                            type="number"
                            onChange={handleHeightCmChange}
                            value={heightCm}
                        />
                    ) : (
                        <Box display="flex">
                            <TextField
                                required
                                label="Feet"
                                fullWidth
                                type="number"
                                sx={{ marginRight: 1 }}
                                onChange={handleHeightFeetChange}
                                value={heightFeet}
                            />
                            <TextField
                                required
                                label="Inches"
                                fullWidth
                                type="number"
                                onChange={handleHeightInchesChange}
                                value={heightInches}
                            />
                        </Box>
                    )}
                    <FormControlLabel
                        control={<Switch checked={isMetricHeight} onChange={toggleHeightUnits} />}
                        label="Use cm"
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Typography>Weight</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    {isMetricWeight ? (
                        <TextField
                            required
                            label="Weight (kg)"
                            fullWidth
                            type="number"
                            onChange={handleWeightChange}
                            value={weight}
                        />
                    ) : (
                        <TextField
                            required
                            label="Weight (lbs)"
                            fullWidth
                            type="number"
                            onChange={handleWeightLbsChange}
                            value={weightLbs}
                        />
                    )}
                    <FormControlLabel
                        control={<Switch checked={isMetricWeight} onChange={toggleWeightUnits} />}
                        label="Use kg"
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Typography>Sex</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleSexChange}
                            value={sex}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Typography>Activity level</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        select
                        required
                        fullWidth
                        value={activityLevel}
                        onChange={handleActivityLevelChange}
                    >
                        {activityLevels.map((item) => (
                            <MenuItem key={item.label} value={item.label}>
                                <Stack>
                                    <Typography variant="body1">{item.label}</Typography>
                                    <Typography variant="caption">{item.description}</Typography>
                                </Stack>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={12} md={5}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Calculate
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
