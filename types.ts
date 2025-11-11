
export interface Room {
  id: string;
  nameKey: string;
  locationKey: string;
  capacity: number;
  amenityKeys: string[];
  imageUrl: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  bookedBy: string;
  department: string;
  meetingTitle: string;
  startTime: string; // ISO 8601 string format
  endTime: string;   // ISO 8601 string format
}