import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Rooms from './Rooms'
// import Header from './Header'

let mockRelay = {
  joinRoom: jest.fn()
}
describe('Listening Rooms', () => {
  test('should instantiate a room', async () => {
    const mockRoom = {
      name: "Room 1",
      id: 1
    }
    render(<Rooms relay={mockRelay} rooms={[mockRoom]}/>)
    expect(await screen.findByText("Room 1")).toBeTruthy();
  });
  
});