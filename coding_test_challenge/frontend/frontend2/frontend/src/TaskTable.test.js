import { render, screen } from '@testing-library/react';
import TaskTable from './components/TaskTable/TaskTable';
import * as taskService from './services/taskService'

jest.mock('./services/taskService')
describe('TaskViewPage', () => {
    test('loads and displays tasks', async () => {
        taskService.getTask.mockResolvedValue([
            { id: 1, title: 'Mocked Task', description: 'This is a test task' }
        ]);

        render(<TaskViewPage />);

        expect(await screen.findByText('Mocked Task')).toBeInTheDocument();
    });

    test('shows error if loading tasks fails', async () => {
        taskService.getTask.mockRejectedValue(new Error('Network error'));

        render(<TaskViewPage />);

        expect(await screen.findByText(/error loading tasks/i)).toBeInTheDocument();
    });
});