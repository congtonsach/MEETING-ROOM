import { Room, Booking } from './types';

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    nameKey: 'room1Name',
    locationKey: 'room1Location',
    capacity: 30,
    amenityKeys: ['amenityProjector'],
    imageUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'room-2',
    nameKey: 'room2Name',
    locationKey: 'room2Location',
    capacity: 30,
    amenityKeys: ['amenityProjector', 'amenityOnlineMeeting'],
    imageUrl: 'https://images.unsplash.com/photo-1560439514-e960a3ef50d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'room-3',
    nameKey: 'room3Name',
    locationKey: 'room3Location',
    capacity: 15,
    amenityKeys: ['amenityProjector', 'amenityWhiteboard'],
    imageUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'room-great',
    nameKey: 'roomGreatName',
    locationKey: 'roomGreatLocation',
    capacity: 20,
    amenityKeys: ['amenityProjector', 'amenityOnlineMeeting', 'amenityWhiteboard'],
    imageUrl: 'https://images.unsplash.com/photo-1600880292210-859384882b6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'room-training',
    nameKey: 'roomTrainingName',
    locationKey: 'roomTrainingLocation',
    capacity: 30,
    amenityKeys: ['amenityProjector', 'amenityWhiteboard'],
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'room-hall',
    nameKey: 'roomHallName',
    locationKey: 'roomHallLocation',
    capacity: 500,
    amenityKeys: ['amenityLedScreen', 'amenitySoundSystem'],
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  }
];

// Helper to create date strings for today
const today = new Date();
const createDate = (hour: number, minute: number): string => {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute).toISOString();
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    roomId: 'room-1',
    roomName: 'Phòng họp số 1',
    userId: 'user-1',
    bookedBy: 'An Nguyễn',
    department: 'Marketing',
    meetingTitle: 'Họp team Marketing',
    startTime: createDate(9, 0),
    endTime: createDate(10, 30),
  },
  {
    id: 'booking-2',
    roomId: 'room-2',
    roomName: 'Phòng họp số 2',
    userId: 'user-2',
    bookedBy: 'Bình Trần',
    department: 'Ban Giám đốc',
    meetingTitle: 'Họp ban giám đốc',
    startTime: createDate(14, 0),
    endTime: createDate(16, 0),
  },
  {
    id: 'booking-3',
    roomId: 'room-great',
    roomName: 'Phòng GREAT',
    userId: 'user-3',
    bookedBy: 'Cẩm Lê',
    department: 'Product',
    meetingTitle: 'Brainstorm ý tưởng mới',
    startTime: createDate(11, 0),
    endTime: createDate(12, 0),
  },
];