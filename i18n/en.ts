import type { Translations } from './vi';

export const en: Translations = {
  headerTitle: 'Meeting Room Booking System',
  contactInfo: 'Contact Reception (HR Dept): 02113.888.987',
  headerWelcome: 'Hello, Employee',
  selectRoomTitle: 'Select a Meeting Room',
  // RoomCard
  roomCardCapacity: 'Up to {capacity} people',
  roomStatusReady: 'Available',
  roomStatusBusy: 'In a meeting',
  roomStatusUpcoming: 'Meeting in {minutes} min',
  detailsButton: 'Details',
  bookButton: 'Book Room',
  // BookingModal
  bookingModalTitle: 'Book Room: {roomName}',
  bookingModalMeetingDetails: 'Meeting Details',
  bookingModalMeetingTitleLabel: 'Meeting Title',
  bookingModalBookedByLabel: 'Booked By',
  bookingModalDepartmentLabel: 'Department',
  bookingModalDateLabel: 'Date',
  bookingModalStartLabel: 'Start',
  bookingModalEndLabel: 'End',
  bookingModalScheduleTitle: 'Schedule for {date}',
  bookingModalCancelButton: 'Cancel',
  bookingModalConfirmButton: 'Confirm Booking',
  // RoomDetailModal
  roomDetailModalTitle: '{roomName}',
  roomDetailCapacity: 'Capacity:',
  roomDetailCapacityValue: '{capacity} people',
  roomDetailAmenities: 'Available Amenities:',
  roomDetailScheduleTitle: "Today's Schedule ({date})",
  roomDetailNoBookings: 'No bookings for today.',
  roomDetailCloseButton: 'Close',
  // Notifications in App.tsx
  notificationSuccess: 'Room "{roomName}" booked successfully!',
  notificationErrorTime: 'End time must be after start time.',
  notificationErrorConflict: 'This room is already booked for this time slot. Please choose another time.',
  
  // Room Names
  room1Name: 'Meeting Room 1',
  room2Name: 'Meeting Room 2',
  room3Name: 'Meeting Room 3',
  roomGreatName: 'GREAT Room',
  roomTrainingName: 'Training Room',
  roomHallName: 'Grand Hall',

  // Room Locations
  room1Location: '2nd floor (opposite IT room)',
  room2Location: '1st floor (near the canteen)',
  room3Location: '1st floor (near HR Department)',
  roomGreatLocation: '2nd floor (near the stairs)',
  roomTrainingLocation: '1st floor (opposite VIP dining room)',
  roomHallLocation: '1st floor, Ceramic Institute building',

  // Amenities
  amenityProjector: 'Projector',
  amenityOnlineMeeting: 'Online Meeting',
  amenityWhiteboard: 'Whiteboard',
  amenityLedScreen: 'LED Screen',
  amenitySoundSystem: 'Sound system (speakers, mic, amplifier)',
};