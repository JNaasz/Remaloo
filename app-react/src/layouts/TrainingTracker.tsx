import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import { RootState } from '../stores/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../stores';
import { setTrainingData } from '../stores/trackerSlice';

import { SheetData, SheetItem } from 'common/src/types/globals';
import TrainingItem from '../features/trainingTracker/TrainingItem';
import TrainingForm from '../features/trainingTracker/TrainingForm';

import { getSheetData } from 'common/src/api/sheets';

function TrainingTracker() {
	const dispatch: AppDispatch = useDispatch();
	const [data, setData] = useState<SheetData | null>(null);
	const [logTraining, setLogTraining] = useState<boolean>(false);

	const storedData = useSelector(
		(state: RootState) => state.trainingTracker
	);

	useEffect(() => {
		async function updateData() {
			if (storedData && !data) {
				// ensure the cached data get's set to component data
				console.log('what is this?', storedData);
				// setData(storedData);
			} else if (!data) {
				// if the data was not cached, then fetch it and store to
				const apiData: SheetData = await getSheetData(null);
				dispatch(setTrainingData(apiData));
				setData(apiData);
			}
		}

		updateData();
	}, [storedData, data, dispatch]);

	const trainingItems: SheetItem[] = data?.sheets[0]?.items || [];
	 // TODO: update server to sort items by date
	const lastTraining = trainingItems.length > 0 ? trainingItems[0].Date : null;

	const beginLog = () => {
		setLogTraining(true);
	}

	const handleFormCancel = () => {
		setLogTraining(false);
	}

	const handleFormSubmit = () => {
		console.log('submit form, call api to set data');
		setLogTraining(false);
	}

  return (
		<Box className="content trainnig" sx={{ height: '100%' }}>
			{data && (
				<div className="training-data" style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}>
					<Box
						className="title"
						sx={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between', pb: 2 }}
					>
						{!lastTraining ? (
							<Typography>No training logged yet.</Typography>
						) : (
							<Typography>Last Training on { lastTraining }</Typography>
						)}

						{!logTraining && (
							<Button variant="contained" onClick={beginLog}>Log Training</Button>
						)}
					</Box>

					{/* TODO: hide scrollbar visibility except when hovering on desktop */}
					<div className="training-items" style={{ overflow: 'auto' }}>
						{!logTraining && trainingItems.map((item, index) => (
							<TrainingItem key={index} trainingItem={item} />
						))}
					</div>

					{logTraining && (
						<div className="training-form">
							<TrainingForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
						</div>
					)}
				</div>
			)}
		</Box>
	);
}

export default TrainingTracker;
