import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import { SheetData, SheetItem } from '../../../types/globals';
import TrainingItem from '../components/TrainingItem';
import TrainingForm from '../components/TrainingForm';

function TrainingTracker() {
	const [data, setData] = useState<SheetData | null>(null);
	const [logTraining, setLogTraining] = useState<boolean>(false);

	useEffect(() => {
		// when layout loads, fetch data
		// eventually store this to state so we aren't fetching every time page loads
		const fetchData = async () => {
			const response = await fetch('http://localhost:2000/sheet-data');
			const resJson: SheetData = await response.json();
			setData(resJson);
		}

		if (!data) {
			fetchData();
		}
	});

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
