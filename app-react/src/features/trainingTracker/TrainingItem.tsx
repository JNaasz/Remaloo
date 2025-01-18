import { Card, CardContent } from '@mui/material';
import { SheetItem } from '../../../../types/globals';

interface TrainingItemProps {
	trainingItem: SheetItem;
}

function TrainingItem({ trainingItem }: TrainingItemProps) {
	return (
		<Card className="trainingItem" sx={{ marginBottom: 2, textAlign: 'left' }}>
			<CardContent>
				<p><span>{ trainingItem.Date }</span></p>
				<p>Practiced for { trainingItem.Duration }min in the { trainingItem.Place }.</p>
				{trainingItem.Comment && (
					<p>{ trainingItem.Comment }.</p>
				)}
			</CardContent>
		</Card>
	)
}

export default TrainingItem;